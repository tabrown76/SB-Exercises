const express = require('express')
const router = new express.Router();
const User = require('../models/user');
const ExpressError = require('../expressError');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post('/login', async function(req, res, next) {
    try {
        const {username, password} = req.body;
        if(!username || !password) throw new ExpressError('Username/Password required.', 400)
        const user = await User.authenticate(username, password);
        if(user){
            await User.updateLoginTimestamp(username);
            const _token = jwt.sign({username}, SECRET_KEY);
            req.body._token = _token;
            return res.json({_token});
        }
        throw new ExpressError('Incorrect username/password', 400);
    } catch(e) {
        return next(e);
    }
})


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post('/register', async function(req, res, next) {
    try {
        const {username, password, first_name, last_name, phone} = req.body;
        const reqFields = [username, password, first_name, last_name, phone];
        for(let i = 0; i < reqFields.length; i++){
            if(!reqFields[i]) throw new ExpressError(`${reqFields[i]} required.`, 400)
        }
        await User.register({username, password, first_name, last_name, phone});
        await User.updateLoginTimestamp(username);
        const _token = jwt.sign({username}, SECRET_KEY);
        req.body._token = _token;
        return res.json({_token});
    } catch(e) {
        if(e.code === `23505`){
            return next(new ExpressError(`Username taken.`, 400));
          }
        return next(e);
    }
})

module.exports = router;