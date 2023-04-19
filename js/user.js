"use strict";

// global to hold the User instance of the currently-logged-in user
let currentUser;

/******************************************************************************
 * User login/signup/login
 */

/** Handle login form submission. If login ok, sets up the user instance */
async function login(evt) {
  console.debug("login", evt);
  evt.preventDefault();

  // grab the username and password
  const username = $("#login-username").val();
  const password = $("#login-password").val();

  // User.login retrieves user info from API and returns User instance
  // which we'll make the globally-available, logged-in user.
  currentUser = await User.login(username, password);
  console.log("User object after creating User object (login):", currentUser);

  // Load favorites from localStorage
  const favoritesStr = localStorage.getItem("favorites");
  if (favoritesStr) {
    currentUser.favorites = JSON.parse(favoritesStr).map(fav => new Story(fav));
  }

  $loginForm.trigger("reset");

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
  $('#login-signup-form').addClass('hidden');
  addFavoriteClassToStories();
}

$loginForm.on("submit", login);

/** Handle signup form submission. */
async function signup(evt) {
  console.debug("signup", evt);
  evt.preventDefault();

  const name = $("#signup-name").val();
  const username = $("#signup-username").val();
  const password = $("#signup-password").val();

  // User.signup retrieves user info from API and returns User instance
  // which we'll make the globally-available, logged-in user.
  currentUser = await User.signup(username, password, name);

  console.log("currentUser after User.signup:", currentUser);

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
  $signupForm.trigger("reset");
}

$signupForm.on("submit", signup);

/** Handle click of logout button
*
* Remove their credentials from localStorage and refresh page
*/
function logout(evt) {
  console.debug("logout", evt);
  currentUser = null; // Clear the current user
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  location.reload();
}


$navLogOut.on("click", logout);

/******************************************************************************
* Storing/recalling previously-logged-in-user with localStorage
*/

/** If there are user credentials in local storage, use those to log in
* that user. This is meant to be called on page load, just once.
*/

async function checkForRememberedUser() {
  console.debug("checkForRememberedUser");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  console.log("Retrieved token:", token);
  console.log("Retrieved username:", username);

  if (!token || !username) return;

  // try to log in with these credentials (will be null if login failed)
  console.log("Passing token to loginViaStoredCredentials:", token);
  console.log("Passing username to loginViaStoredCredentials:", username);
  currentUser = await User.loginViaStoredCredentials(token, username);

  const favoritesStr = localStorage.getItem("favorites");
  if (currentUser){
    if (favoritesStr) {
      currentUser.favorites = JSON.parse(favoritesStr);
    }
    currentUser.username = currentUser.username.username || currentUser.username;
  }
  console.log("Token from localStorage:", token);
  console.log("Username from localStorage:", username);

  $navUserProfile.text(username);

  updateUIOnUserLogin();
}



/** Sync current user information to localStorage.
* We store the username/token in localStorage so when the page is refreshed
* (or the user revisits the site later), they will still be logged in.
*/
function saveUserCredentialsInLocalStorage() {
  console.debug("saveUserCredentialsInLocalStorage");
  console.log("User object before saving to localStorage:", JSON.parse(JSON.stringify(currentUser)));

  if (currentUser) {
    localStorage.setItem("token", currentUser.loginToken);
    localStorage.setItem("username", currentUser.username);
    localStorage.setItem("favorites", JSON.stringify(currentUser.favorites));
  }
  console.log("Stored token:", currentUser.loginToken);
  console.log("Stored username:", currentUser.username);
}

function saveFavoritesToLocalStorage() {
  localStorage.setItem("favorites", JSON.stringify(currentUser.favorites));
}

/******************************************************************************
* General UI stuff about users
*/

/** When a user signs up or registers, we want to set up the UI for them:
* - show the stories list
* - update nav bar options for logged-in user
* - generate the user profile part of the page
*/
function updateUIOnUserLogin() {
  console.debug("updateUIOnUserLogin");
  
  if (!currentUser) {
    return;
  }
  
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  if (favorites) {
    currentUser.favorites = favorites.map(fav => new Story(fav));
  }

  $allStoriesList.show();
  $navUserProfile.text(currentUser.username).show(  );

  updateNavOnLogin();
}

$('#nav-submit').hide();
$('#nav-favorites').hide();