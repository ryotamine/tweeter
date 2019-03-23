$(document).ready(function() {

  // Character countdown function
  $("textarea").on("input", function() {
    let startCount = 140;
    let tweetLength = $(this).val().length;
    let tweetCount = startCount - tweetLength;
    let count = $(".counter");

    if (tweetCount >= 0) {
      count.removeClass("over");
      count.text(tweetCount);
    } else {
      count.addClass("over");
      count.text(tweetCount);
    }
  });

});