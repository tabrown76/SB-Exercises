/** User class for message.ly */

const db = require("../db");
const ExpressError = require("../expressError");
const bcrypt = require('bcrypt');
const {BCRYPT_WORK_FACTOR} = require('../config');

/** User of the site. */

class User {
  constructor(username, password, first_name, last_name, phone){
    this.username = username;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone = phone;
  }

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) {
    const hashedPswd = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const results = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, phone, join_at, last_login_at)
      VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)
      RETURNING username, password, first_name, last_name, phone`,
      [username, hashedPswd, first_name, last_name, phone]
    );
    return results.rows[0];
   }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    const results = await db.query(
      `SELECT password
      FROM users
      WHERE username=$1`,
      [username]
    );
    const userPswd = results.rows[0].password;
    return await bcrypt.compare(password, userPswd);
   }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) { 
    await db.query(
      `UPDATE users
      SET last_login_at=current_timestamp
      WHERE username=$1`,
      [username])
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() { 
    const results = await db.query(
      `SELECT username, first_name, last_name, phone
      FROM users`
    );
    return results.rows;
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    try {
      const results = await db.query(
        `SELECT username, first_name, last_name, phone, join_at, last_login_at
        FROM users
        WHERE username=$1`,
        [username]
      );
      if(results.rows === 0) throw new ExpressError(`${username} not found.`, 404);
      return results.rows[0];
    } catch(e) {
      throw new Error(`Error: ${e.message}`);
    }
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) { 
    try {
      const mResults = await db.query(
        `SELECT id, to_username, body, sent_at, read_at
        FROM messages
        WHERE from_username=$1`,
        [username]
      );
      const messages = mResults.rows;
      const toUsernames = [...new Set(messages.map(message => message.to_username))];

      const uResults = await db.query(
        `SELECT username, first_name, last_name, phone
        FROM users
        WHERE username = ANY($1::text[])`,
        [toUsernames]
      );

      const userMap = {};
      for(let user of uResults.rows) {
        userMap[user.username] = user;
      }

      for(let message of messages) {
        message.to_user = userMap[message.to_username];
        delete message.to_username;
      }
    
      return messages;
    } catch(e) {
      throw new Error(`Error: ${e.message}`);
    }
  }
  

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) { 
    try {
      const mResults = await db.query(
        `SELECT id, from_username, body, sent_at, read_at
        FROM messages
        WHERE to_username=$1`,
        [username]
      );
      
      const messages = mResults.rows;
      const fromUsernames = [...new Set(messages.map(message => message.from_username))];
      
      const uResults = await db.query(
        `SELECT username, first_name, last_name, phone
        FROM users
        WHERE username = ANY($1::text[])`,
        [fromUsernames]
      );
      
      const userMap = {};
      for(let user of uResults.rows) {
        userMap[user.username] = user;
      }
      
      for(let message of messages) {
        message.from_user = userMap[message.from_username];
        delete message.from_username;
      }
  
      return messages;
    } catch(e) {
      throw new Error(`Error: ${e.message}`);
    }
  }
}


module.exports = User;