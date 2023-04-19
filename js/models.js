"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

/******************************************************************************
* Story: a single story in the system
*/
class Story {

  /** Make instance of Story from data object about story:
  *   - {title, author, url, username, storyId, createdAt}
  */
  constructor({ storyId, title, author, url, username, createdAt }) {
    this.storyId = storyId;
    this.title = title;
    this.author = author;
    this.url = url;
    this.username = username;
    this.createdAt = createdAt;
  }

  /** Parses hostname out of URL and returns it. */
  getHostName() {
    const url = new URL(this.url);
    return url.hostname;
  }
}


/******************************************************************************
* List of Story instances: used by UI to show story lists in DOM.
*/
class StoryList {
  constructor(stories) {
    this.stories = stories;
  }

  /** Generate a new StoryList. It:
  *  - calls the API
  *  - builds an array of Story instances
  *  - makes a single StoryList instance out of that
  *  - returns the StoryList instance.
  */
  static async getStories() {
    // Note presence of `static` keyword: this indicates that getStories is
    //  **not** an instance method. Rather, it is a method that is called on the
    //  class directly. Why doesn't it make sense for getStories to be an
    //  instance method?
    // query the /stories endpoint (no auth required)
    const response = await axios({
      url: `${BASE_URL}/stories`,
      method: "GET",
    });

    // turn plain old story objects from API into instances of Story class
    const stories = response.data.stories.map(story => new Story(story));

    // build an instance of our own class using the new array of stories
    return new StoryList(stories);
  }

  /** Adds story data to API, makes a Story instance, adds it to story list.
  * - user - the current instance of User who will post the story
  * - obj of {title, author, url}
  * Returns the new Story instance
  */
  async addStory(user, newStory) {
    const response = await axios.post(`${BASE_URL}/stories`, {
      token: user.loginToken,
      story: newStory
    });
    
    const story = new Story(response.data.story);
    this.stories.unshift(story);
    return story;
  }
  
  /**
  Remove a story from the API and update the storyList object
  and currentUser object with the new list of stories and updated
  favorites, respectively.
  @param {User} user - the current User instance
  @param {string} storyId - the ID of the story to be removed
  @returns {undefined}
  */
  async removeStory(user, storyId) {
    await axios({
      url: `${BASE_URL}/stories/${storyId}`,
      method: "DELETE",
      data: {
        token: user.loginToken,
      },
    });
  
    // Remove the story from the stories array
    this.stories = this.stories.filter((story) => story.storyId !== storyId);
  
    // Remove the story from the user's ownStories array
    user.ownStories = user.ownStories.filter((story) => story.storyId !== storyId);
  }
  
}


/******************************************************************************
* User: a user in the system (only used to represent the current user)
*/
class User {
  /** Make user instance from obj of user data and a token:
  *   - {username, name, createdAt, favorites[], ownStories[]}
  *   - token
  */
  constructor(username, name, createdAt, loginToken, favorites = [], ownStories = []) {
    this.username = username;
    this.name = name;
    this.createdAt = createdAt;
    this.loginToken = loginToken;
    this.favorites = favorites.map(s => new Story(s));
    this.ownStories = ownStories.map(s => new Story(s));
  } 

  /** Register new user in API, make User instance & return it.
  *
  * - username: a new username
  * - password: a new password
  * - name: the user's full name
  */
  static async signup(username, password, name) {
    const response = await axios.post(`${BASE_URL}/signup`, {
      user: { username, password, name },
    });

    let { user, token } = response.data;
    return new User(user.username, user.name, user.createdAt, token, user.favorites);

  }

  /** Login in user with API, make User instance & return it.
  * - username: an existing user's username
  * - password: an existing user's password
  */
  static async login(username, password) {
    const response = await axios.post(`${BASE_URL}/login`, {
      user: { username, password },
    });
  
    let { user, token } = response.data;
    return new User(user.username, user.name, user.createdAt, token, user.favorites);
  }
  


  /** When we already have credentials (token & username) for a user,
  *   we can log them in automatically. This function does that.
  */
  static async loginViaStoredCredentials(token, username) {
    try {
      const res = await axios({
        url: `${BASE_URL}/users/${username}`,
        method: "GET",
        params: { token },
      });
  
      // Build a new User instance from the API response
      const existingUser = new User(res.data.user);
  
      return existingUser;
    } catch (err) {
      console.error("loginViaStoredCredentials failed", err);
      return null;
    }
  }
  
  /**
  Adds the given story ID to the current user's favorites list on the server.
  @param {string} storyId - The ID of the story to add to the favorites list.
  @returns {Story} - The Story instance of the story that was added to the favorites list.
  */
  addFavorite(storyId) {
    const story = storyList.stories.find(s => s.storyId === storyId);
    this.favorites.push(story);
  }
  
  /**
  Removes the given story ID from the current user's favorites list on the server.
  @param {string} storyId - The ID of the story to remove from the favorites list.
  @returns {Story} - The Story instance of the story that was removed from the favorites list.
  */
  removeFavorite(storyId) {
    this.favorites = this.favorites.filter(s => s.storyId !== storyId);
  }
}