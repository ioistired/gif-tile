$( document ).ready(function() {
  /*  Show/hide menu
      Credits to Utkanos on StackOverflow
      http://stackoverflow.com/a/18562295

      TODO: show/hide menu *button* too, on mousemove anywhere in the document
      This isn't needed anymore, as we have Meny!
      http://lab.hakim.se/meny/
  */
  /*var menu = $('#menu'), but = $('#menu_button');
  $(document).on('click', '*', function(evt) {
      evt.stopPropagation();
      if ($(this).is(but))
          menu.toggle();
      else if (!$(this).closest(menu).length)
          menu.hide();
  });*/

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
    var imgUrl = $("#imgUrlEl").val(),
    audioUrl = $("#audioUrlEl").val();
    // Actually update the page
    update(imgUrl, audioUrl);
  });
});
