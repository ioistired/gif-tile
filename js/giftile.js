$( document ).ready(function() {

  /* BEGIN NON-PARSE CODE */
  // Function that returns the URLs
  function getUrls() {
    var imgUrl = $("#imgUrlEl").val(),
    audioUrl = $("#audioUrlEl").val();
    URLs = {};
    URLs.imgUrl = $("#imgUrlEl").val(),
    URLs.audioUrl = $("#audioUrlEl").val();
    return URLs;
  }
  //  Update the page with the given URLs
  function update(imgUrl, audioUrl) {
    // Use fixed CSS variable
    document.body.style.backgroundImage = 'url('+imgUrl+')';
    //$('.contents').css('background-image', 'url('+imgUrl+')';
    var audioElement = $("#bgAudio");
    audioElement.attr('src', audioUrl);
  };
  //  Update the page with user-inputted URLs
  $("#updateButton").click(function() {
    // Get the URLs from the form
    URLs = getUrls();
    // Actually update the page
    update(URLs.imgUrl, URLs.audioUrl);
    });
  /* END NON-PARSE CODE */
  /* BEGIN PARSE CODE */
  // Initialize Parse (hooray for API keys!)
  Parse.initialize("A9sAQb11swZBuH5Inpf4hkGzK0ma6oAu1r715PJJ", "7GYYxwkdtjw45x7Mop8qMYQdJy4Z31CImCLZEhGH");
  // New ShortUrls Class
  var ShortURLs = Parse.Object.extend("ShortURLs");
  var shortUrls = new ShortURLs();
  // Create a permalink with the user-inputted URLs
  $("#createPermalinkButton").click(function() {
    URLs = getUrls();
    alert(URLs.imgUrl);
    shortUrls.save({"imgUrl": URLs.imgUrl, "audioUrl": URLs.audioUrl}).then(function(object) {
  alert("Permalink saved successfully!");
});
});
});
  /* END PARSE CODE */