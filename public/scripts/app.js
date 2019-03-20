/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Create tweet element function
function createTweetElement(tweet) {
  let $tweet = $('<article>').addClass('post-tweet');

  // let name = tweet.user.name;
  // let avatars = tweet.user.avatars;
  // let handle = tweet.handle;
  // let text = tweet.content.text;
  // let createdAt = tweet.created_at;
  let content =
    `
      <header>
        <img class="bird" src="${tweet.user.avatars.small}">
        <p class="name">${tweet.user.name}</p>
        <p class="userName">${tweet.user.handle}</p>
      </header>
        <p class="content">${tweet.content.text}</p>
      <footer>
        <p class="days">${tweet.created_at}</p>
      </footer>
    `
  $tweet.append(content)
  return $tweet;
};

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
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
};

let $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log("blah ", $tweet.html()); // to see what it looks like
$('.container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.