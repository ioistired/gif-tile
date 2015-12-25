document.addEventListener("DOMContentLoaded", function(event) {
    /* BEGIN NON-PARSE CODE */

    // Function that returns the URLs
    function getUrls() {
        URLs = {};
        URLs.imgUrl = document.getElementById("imgUrlEl").value;
        URLs.audioUrl = document.getElementById("audioUrlEl").value;
        return URLs;
    }
    // Don't refresh on form submit
    var formExists = false;
    var form = document.getElementById('updateForm');
    if (typeof(form) != 'undefined' && form !== null) {
        form.onsubmit = function() {
            return false;
        };
        formExists = true;
    }
    //  Update the page with the given URLs
    function update(imgUrl, audioUrl) {
        // Use fixed CSS variable
        document.body.style.backgroundImage = 'url(' + imgUrl + ')';
        document.getElementById("bgAudio").setAttribute('src', audioUrl);
    }
    //  Update the page with user-inputted URLs when #updateButton is clicked
    button = document.getElementById("updateButton");
    if (typeof(button) != "undefined" && button !== null) {
        button.addEventListener("click", (function () {
            // Get the URLs from the form
            URLs = getUrls();
            // Actually update the page
            update(URLs.imgUrl, URLs.audioUrl);
        }));
    }
    // http://stackoverflow.com/a/987376
    function SelectText(element) {
        var doc = document
            , text = doc.getElementById(element)
            , range, selection
        ;    
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();        
            range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    /* END NON-PARSE CODE */

    /* BEGIN PARSE CODE */
    // Initialize Parse (hooray for API keys!)
    Parse.initialize("A9sAQb11swZBuH5Inpf4hkGzK0ma6oAu1r715PJJ", "7GYYxwkdtjw45x7Mop8qMYQdJy4Z31CImCLZEhGH");
    // New ShortUrls Class
    var ShortURLs = Parse.Object.extend("ShortURLs");
    var shortUrls = new ShortURLs();
    var query = new Parse.Query(ShortURLs);

    // Create a permalink with the user-inputted URLs
    // Grab the HTTP GET query
    // http://stackoverflow.com/a/21210643
    var queryDict = {};
    location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});
    // Detect permalinks!
    if (typeof queryDict.id != "undefined" && queryDict.id !== null) {
        // Get the URLs from the requested ShortURLs id (without a trailing slash) if possible
        query.get(queryDict.id.replace(/\/+$/, ''), {
            success: function(object) {
                // Make it clear to the user what image / audio is being used.
                if (formExists) {
                    document.getElementById("imgUrlEl").setAttribute("value", object.get("imgUrl"));
                    document.getElementById("audioUrlEl").setAttribute("value", object.get("audioUrl"));
                }
                update(object.get("imgUrl"), object.get("audioUrl"));
            },
            error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
                alert("Failed to retrieve the permalink! Please check your typing and try again.");
            }
        });
    }
    var hasPermalinkDisplayed = false;
    if (formExists) {
        document.getElementById("createPermalinkButton").addEventListener("click", (function () {
            URLs = getUrls();
            if ((URLs.imgUrl !== "") || (URLs.audioUrl !== "")) {
                shortUrls.save({
                    "imgUrl": URLs.imgUrl,
                    "audioUrl": URLs.audioUrl
                }).then(function (object) {
                    if (hasPermalinkDisplayed === false) {
                        newLink = window.location.origin + "/combo?id="+ shortUrls.id;
                        document.getElementById('createPermalinkButton').insertAdjacentHTML('afterend',
                            '<br />Your permalink is:<br /><a id="shortUrl" href="'+newLink+'">'+newLink+'</a>');
                        SelectText('shortUrl');
                        hasPermalinkDisplayed = true;
                    }
                }, function (error) {
                    alert("Permalink save unsuccesful.\nPlease try again.");
                });
            } else {
              alert("Permalink not saved. Please enter an image URL or an audio URL or both.");
            }
        }));
    }
});
/* END PARSE CODE */
