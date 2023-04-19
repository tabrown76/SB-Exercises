"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */
async function getAndShowStoriesOnStart() {
  console.log("Getting and showing stories on start");
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
* A render method to render HTML for an individual Story instance
* - story: an instance of Story
* Returns the markup for the story.
*/
function generateStoryMarkup(story) {
  // Check if the story is in the user's favorites list
  const isFavorite = currentUser
    ? currentUser.favorites.some(favStory => favStory.storyId === story.storyId)
    : false;

  // Determine the star icon type based on whether the story is a favorite or not
  const starType = isFavorite ? "fas" : "far";

  const trashIcon = currentUser && currentUser.username === story.username ? '<i class="fas fa-trash-alt"></i>' : '';

  const hostName = story.getHostName();

  return $(`
      <li id="${story.storyId}">
        <i class="${starType} fa-star"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        ${trashIcon}
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        <hr>
      </li>
    `);
}

/**
*Adds the "fas" or "far" class to the star icons in each story on the page
*based on whether the story is in the user's favorites list or not.
*/
function addFavoriteClassToStories() {
  const favoriteStoryIds = new Set(currentUser.favorites.map(story => story.storyId));

  $allStoriesList.find("li").each(function() {
    const $star = $(this).find("i.fa-star");

    if (favoriteStoryIds.has($(this).attr("id"))) {
      $star.removeClass("far").addClass("fas");
    } else {
      $star.removeClass("fas").addClass("far");
    }
  });
}

/** Gets list of stories from server, generates their HTML, and puts on page. */
function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

const $submitStoryForm = $("#submit-story-form");

/**
Handle submission of the submit story form.
@param {Event} evt - The event object representing the form submission.
Gets data from the form, calls the addStory method of the StoryList instance,
and adds the new story to the list of stories on the page.
*/
async function submitStory(evt) {
  console.debug("submitStory", evt);
  evt.preventDefault();

  // Get the data from the form
  const author = $("#author").val();
  const title = $("#title").val();
  const url = $("#url").val();

  // Log the currentUser.loginToken value
  console.log("currentUser.loginToken:", currentUser.loginToken);

  // Call the .addStory method
  const newStory = await storyList.addStory(currentUser, { title, author, url });

  // Put the new story on the page
  const $story = generateStoryMarkup(newStory);
  $allStoriesList.prepend($story);

  // Clear and hide the form
  $("#submit-story-form").trigger("reset");
  $submitStoryForm.hide();
  $allStoriesList.show();
}

$submitStoryForm.on("submit", submitStory);

// Event listener for favorite icon click
$allStoriesList.on("click", "li > i", toggleStoryFavorite);

// Function to toggle favorite status
async function toggleStoryFavorite(evt) {
  const $tgt = $(evt.target);
  const storyId = $tgt.closest("li").attr("id");

  if ($tgt.hasClass("fas")) {
    await currentUser.removeFavorite(storyId);
    $tgt.removeClass("fas");
    $tgt.addClass("far");
  } else {
    await currentUser.addFavorite(storyId);
    $tgt.removeClass("far");
    $tgt.addClass("fas");
  }

  // Save updated favorites to local storage
  saveFavoritesToLocalStorage();
}

/**
Generate HTML markup for the favorite stories and display them on the page.
@function
*/
function putFavoriteStoriesOnPage() {
  console.debug("putFavoriteStoriesOnPage");

  $favoritedStoriesList.empty();

  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $favoritedStoriesList.append($story);
  }

  $favoritedStoriesList.show();
}

/**
Handles click on "favorites" in navbar by hiding all page components except for
a list of the user's favorited stories.
@param {Event} evt - The click event
@returns {undefined}
*/
function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  putFavoriteStoriesOnPage();
}

$body.on("click", "#nav-favorites", navFavoritesClick);

/**
Removes a story from the story list and the DOM when the trash icon is clicked.
@param {event} evt - The event object for the click event.
@returns {undefined}
*/
async function deleteStory(evt) {
  if ($(evt.target).hasClass("fa-trash-alt")) {
    const $story = $(evt.target).closest("li");
    const storyId = $story.attr("id");
    await storyList.removeStory(currentUser, storyId);
    $story.remove();
  }
}

$allStoriesList.on("click", "li > .fa-trash-alt", deleteStory);
