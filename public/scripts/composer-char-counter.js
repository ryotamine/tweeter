$(document).ready(function() {

  // Character countdown function
  $("textarea").on("input", function() {
    let tweetLength = $(this).val().length;
    let tweetCount = 140 - tweetLength;
    let count = $(".counter");

    if (tweetCount > 0) {
      count.removeClass("over");
      count.text(tweetCount);
    } else {
      count.addClass("over");
      count.text(tweetCount);
    }
  });

});