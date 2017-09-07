$(document).ready(function() {
    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=6d635480f9444189bb2125786f5b586b";
    var searchList = [];

    $(".gifSearchButton").click(clickGifSearchButton); // When clicked

    $.ajax({ // Get the API data
        url: queryURL,
        method: 'GET'
    }).done(function(response) { // Do something with the data
        // console.log(response.data);

        for (var i = 0; i < response.data.length; i++) { // Add gifs to html
            var gifURL = response.data[i].images.fixed_height_small.url;
            var gifRating = response.data[i].rating.toUpperCase();

            $(".gifs").append( // Html to be appended
                '<div class="image">' +
                '<img src="' + gifURL + '" />' +
                '<span class="rating">' + gifRating + '</span>' +
                '</div>'
            );
        }
    }); 

    buildSearchButtons();

    function clickGifSearchButton(event) { // push search term into searchList array
        event.preventDefault();
        console.log($(".gifSearch").val());
        searchList.push($(".gifSearch").val());
        $(".gifSearch").val("");
        buildSearchButtons();
    }
    function buildSearchButtons() { // repopulate header with search term buttons
        $(".searchList").empty();
        for (var i = 0; i < searchList.length; i++) {
            $(".searchList").append(
            '<button type="submit" class="termButton">' + searchList[i] + '</button>'
            );
        }
        $(".termButton").click(getButtonTerm);
    }
    function getButtonTerm(event) { // get the gifs that were searched for
        event.preventDefault();
        console.log($(this).text());

        var searchTerm = $(this).text();
        var searchURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=6d635480f9444189bb2125786f5b586b";

        $(".image").empty();
        $.ajax({ // Get the API data
            url: searchURL,
            method: 'GET'
        }).done(function(response) { // Do something with the data
            // console.log(response.data);

            for (var i = 0; i < response.data.length; i++) { // Add gifs to html
                var gifURL = response.data[i].images.fixed_height_small.url;
                var gifRating = response.data[i].rating.toUpperCase();

                $(".gifs").append( // Html to be appended
                    '<div class="image">' +
                    '<img src="' + gifURL + '" />' +
                    '<span class="rating">' + gifRating + '</span>' +
                    '</div>'
                );
            }
        }); 
    }
});