/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Create tweet function
function createTweetElement(tweet) {
  let $tweet = $('<article>').addClass('post-tweet');

  let avatars = tweet.user.avatars.small;
  let name = tweet.user.name;
  let handle = tweet.user.handle;
  let text = tweet.content.text;
  let createdAt = tweet.created_at;

  let content =
    `
      <header>
        <img class="bird" src="${avatars}">
        <p class="name">${name}</p>
        <p class="userName">${handle}</p>
      </header>
        <p class="content">${text}</p>
      <footer>
        <p class="days">${createdAt}</p>
        <img class="flag" src="./images/flag.png">
        <img class="re-tweet" src="./images/re-tweet.png">
        <img class="love" src="./images/love.png">
      </footer>
    `
  $tweet.prepend(content);
  return $tweet;
};

// Render tweet function
function renderTweets(tweets) {
  $('.tweet-list').empty();
  for (tweet of tweets) {
    let render = createTweetElement(tweet);
    $('.tweet-list').prepend(render);
  }
}

$(document).ready(function() {

  // Compose tweet slide toggle function
  $("#compose").click(function() {
    $(".new-tweet").slideToggle();
  });

  // Load tweets function
  function loadTweets() {
    $.ajax("/tweets")
    .then(function(tweets) {
      console.log(tweets);
      renderTweets(tweets);
    });
  };

  // Check for tweet input from user
  $(".new-tweet form").submit(function(a) {
    a.preventDefault();
    if ($("textarea").val() === "") {
      alert("Tweet is empty. Please try again.");
    } else if ($("textarea").val().length > 140) {
      alert("Tweet exceeds 140 characters. Please try again.");
    } else {
      $.ajax({
        url: $(this).attr("action"),
        method: 'POST',
        data: $(this).serialize()
      })
        .then(function(tweets) {
          loadTweets();
          $("textarea").val("").focus();
      });
    }
  });

});