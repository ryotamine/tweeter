/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// User database
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

// Render tweet function
function renderTweets(tweets) {
  for (tweet of tweets) {
    let render = createTweetElement(tweet);
    $('.container').append(render);
  }
}

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
  $tweet.append(content);
  return $tweet;
};

$(document).ready(function() {

  // POST tweets
  $.post("/tweets", $(this).serialize(), function(event) {
    console.log("It works!");
  });

  // Call render tweets function based on user database
  renderTweets(data);

});