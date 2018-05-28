$(document).ready(function () {
    //Clear previous item
    $('#query').val();

    //Display a random article when user click 'I'm Feeling Lucky'
    $('#random').click(function () {
        window.location = 'https://en.wikipedia.org/wiki/Special:Random';
    });

    //Check input keyword from user
    $('#search').click(function () {
        var keyword = $('#query').val();
        if (keyword === '' || keyword === ' ') {
            alert('You have entered the wrong input. Please try again!');
            $('#query').focus();
            return;
        }

        //Create an API request to wikipedia
        var reqURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + keyword + '&format=json&callback=?';

        //Build ajax request
        $.ajax({
            url: reqURL,
            type: "GET",
            dataType: "json",
            async: false,
            headers: {'Api-User-Agent': 'Example/1.0'},
            success: function (data) {

                //Bind data
                $('#result').html('');
                for (var i = 0; i < data[1].length; i++) {
                    $('#result').prepend('<li><a class="title" href=' + data[3][i] + 'target="_blank">'
                        + data[1][i] + '</a><p>'
                        + data[2][i] + '</p><hr></li>');

                }
            },
            error: function (errorMessage) {
                alert('Failed');
            }

        });
        $('.result-box').show();
    });
});