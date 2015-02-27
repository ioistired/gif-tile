$(document).ready(function () {

    /* BEGIN NON-PARSE CODE */

    // Function that returns the URLs
    function getUrls() {
        URLs = {};
        URLs.imgUrl = $("#imgUrlEl").val(),
            URLs.audioUrl = $("#audioUrlEl").val();
        return URLs;
    }

    //  Update the page with the given URLs
    function update(imgUrl, audioUrl) {
        // Use fixed CSS variable
        document.body.style.backgroundImage = 'url(' + imgUrl + ')';
        var audioElement = $("#bgAudio");
        audioElement.attr('src', audioUrl);
    };
    //  Update the page with user-inputted URLs when #updateButton is clicked
    $("#updateButton").click(function () {
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
    var query = Parse.Query(ShortURLs);
    // Create a permalink with the user-inputted URLs
    var hasPermalinkDisplayed = false;
    $("#createPermalinkButton").click(function () {
        URLs = getUrls();
        if ((URLs.imgUrl !== "") || (URLs.audioUrl !== "")) {
            shortUrls.save({
                "imgUrl": URLs.imgUrl,
                "audioUrl": URLs.audioUrl
            }).then(function (object) {
                if (hasPermalinkDisplayed == false) {
                    $('#createPermalinkButton').after('<br />Your permalink is:<br /><input id="shortUrl" type="text" value="http://giftile.me/?id='+shortUrls.id+'"></input>');
                    $('#shortUrl').select();
                    hasPermalinkDisplayed = true;
                };
            }, function (error) {
                alert("Permalink save unsuccesful.\nPlease try again.");
            });
        } else {
              alert("Permalink not saved. Please enter an image URL or an audio URL or both.");
        };
    });
});
/* END PARSE CODE */