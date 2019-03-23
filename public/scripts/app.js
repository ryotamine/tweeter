// Cross-site scripting prevention function
function escape(str) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Create tweet function
function createTweetElement(tweet) {
  let $tweet = $("<article>").addClass("post-tweet");

  let avatars = tweet.user.avatars.small;
  let name = tweet.user.name;
  let handle = tweet.user.handle;
  let text = escape(tweet.content.text);
  let createdAt = new Date(tweet.created_at);

  let content =
    `
      <article class="post-tweet">
        <header>
          <img class="bird" src="${avatars}">
          <p class="name">${name}</p>
          <p class="userName">${handle}</p>
        </header>
          <p class="content">${text}</p>
        <footer>
          <p class="days">${createdAt}</p>
          <div class="icons">
            <i class="fas fa-heart"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-flag"></i>
          </div>
        </footer>
      </article>
    `
  $tweet.prepend(content);
  return $tweet;
};

// Render tweet function
function renderTweets(tweets) {
  $(".tweet-list").empty();
  for (tweet of tweets) {
    let render = createTweetElement(tweet);
    $(".tweet-list").prepend(render);
  }
};

$(document).ready(function() {

  // Compose tweet slide toggle function
  $("#compose").click(function() {
    $(".new-tweet").slideToggle();
  });

  // Load tweets function
  function loadTweets() {
    $.ajax("/tweets")
      .then(function(tweets) {
        renderTweets(tweets);
    });
  };

  // Check for tweet input from user
  $(".new-tweet form").submit(function(tweetForm) {
    tweetForm.preventDefault();
    if ($("textarea").val() === "") {
      $(".none").animate({
        height: "toggle"
      });
      $(".exceed").hide();
    } else if ($("textarea").val().length > 140) {
      $(".exceed").animate({
        height: "toggle"
      });
      $(".none").hide();
    } else {
      $.ajax({
        url: $(this).attr("action"),
        method: "POST",
        data: $(this).serialize()
      })
        .then(function(tweets) {
          $(".none").hide();
          $(".exceed").hide();
          loadTweets();
          $(".counter").text(140);
          $("textarea").val("").focus();
      });
    }
  });

  // Load existing tweets
  loadTweets();

});