$(document).ready(function() {

    // Clear previous term
    $('#query').val('');

    // Get a random article
    $('#random').click(function() {
        window.location = "https://en.wikipedia.org/wiki/Special:Random";
    });

    // Get search articles
    $('#search').click(function() {

        // Get the term to search for
        var keyword = $('#query').val();
        if (!keyword) {
            alert("Please enter a search query");
            // return focus to search box after error
            $('#query').focus();
            // restart search
            return;
        }

        // Create the url to send to Wikipedia using
        // the action 'opensearch'
        var reqURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + keyword + '&format=json&callback=?';
        console.log(reqURL);

        // Build the ajax request
        $.ajax( {
            type: "GET",
            url: reqURL,
            async: false,
            dataType: "json",
            headers: {
                'Api-User-Agent': 'Example/1.0'
            },

            // If the request is successful:
            success: function(data) {
                //console.log(data);

                // Clear previous search results
                $('#result').html('');

                // Loop through all of the articles returned with the
                // search term in the name
                for (var i = 0; i < data[1].length; i++) {
                    // Add them to the '#result' unordered list
                    $('#result').prepend(
                        // Make the article title a link to the
                        // article with the 4th return object
                        '<li><a class="title" href=' + data[3][i] +
                        ' target="_blank">'
                        // Article title is the 2nd object
                        + data[1][i] + '</a><p><span class="entry">'
                        // Article intro is the 3rd object
                        + data[2][i] + '</span></p><hr></li>');
                }
            },
            // If fail:
            error: function(errorMsg) {
                alert('There was a problem, please try again later');
            }
        }); // end ajax
        $( ".result-box" ).show();
    }); // end the .click function
});
