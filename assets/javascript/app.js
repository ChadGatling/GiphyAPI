$(document).ready(function() {
    var queryURL = "https://api.giphy.com/v1/gifs/trending?limit=50&api_key=6d635480f9444189bb2125786f5b586b";
    var searchList = ["Cats", "Dogs", "No", "Yes", "Happy", "Mad", "Crying", "Scared"];

    $(".small").attr("checked", true);
    var previewSize = $("input[name='size']:checked").attr("value");

    $(".gifAddButton").click(clickGifAddButton); // When clicked
    $(".gifSearchButton").click(clickGifSearchButton);

    $.ajax({ // Get the API data
        url: queryURL,
        method: 'GET'
    }).done(function(response) { // Do something with the data
        // console.log(response.data);

        console.log(previewSize);
        $(".gifs").html('<h3 class ="gifTitle">Trending</h3>'); // title of gifs searched for
        // $(".gifs").html(
        //     '<div class="searchBox">' + ******for this to work you have to put searchbox div inside gifs div and change styling*******
        //         '<form>' +
        //             '<h5>Add search buttons here</h5>' +
        //             '<input class="gifSearch" type="text">' +          
        //             '<button type="submit" class="gifAddButton">Add to List</button>' +
        //             '<button type="submit" class="gifSearchButton">Add and Search</button>' +
        //         '</form>' +
        //     '</div>'
        // );

        for (var i = 0; i < response.data.length; i++) { // Add gifs to html
            var gifURLThumbnail = response.data[i].images[previewSize].url;
            var gifURL = response.data[i].images.original.url;
            var gifRating = response.data[i].rating.toUpperCase();

            // $(".gifs").append( // Html to be appended
            //     '<div class="image">' +
            //         '<a href="' + gifURL + '" target="_blank"><img src="' + gifURLThumbnail + '" /></a>' + // gifs are links to the original
            //     '<span class="rating">' + gifRating + '</span>' + // rating of the gif
            //     '</div>'
            // );

            $(".gifs").append($("<div>").attr("class", "image").html( // add gifs to html(more jQureyie way)
                '<a href="' + gifURL + '" target="_blank"><img src="' + gifURLThumbnail + '" /></a>' + // gifs are links
                '<a href="' + gifURL + '" class="rating" target="_blank"><span>' + gifRating + '</span>' 
            ));
        }
    }); 

    buildSearchButtons();

    function clickGifAddButton(event) { // push search term into searchList array
        event.preventDefault();
        // console.log($(".gifSearch").val());
        searchList.push($(".gifSearch").val()); // add the search term to the array
        $(".gifSearch").val(""); // clear the text field
        buildSearchButtons();
    }
    function clickGifSearchButton(event) { // push search term into searchList array and immediately run the search
        event.preventDefault();
        // console.log($(".gifSearch").val());
        searchList.push($(".gifSearch").val()); // add the search term to the array

        var searchTerm = $(".gifSearch").val(); // the search term
        var searchURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&limit=100&api_key=6d635480f9444189bb2125786f5b586b";

        $(".image").empty();
        $.ajax({ // Get the API data
            url: searchURL,
            method: 'GET'
        }).done(function(response) { // Do something with the data
            // console.log(response.data);

            $(".gifs").html('<h3 class ="gifTitle">' + searchTerm + '</h3>'); // title of the group of gifs
            previewSize = $("input[name='size']:checked").attr("value");
            console.log(previewSize);

            for (var i = 0; i < response.data.length; i++) { // Add gifs to html
                var gifURLThumbnail = response.data[i].images[previewSize].url;
                var gifURL = response.data[i].images.original.url;
                var gifRating = response.data[i].rating.toUpperCase(); // gif rating

                // $(".gifs").append( // Html to be appended
                //     '<div class="image">' +
                //     '<a href="' + gifURL + '" target="_blank"><img src="' + gifURLThumbnail + '" /></a>' + // gifs are links
                //     '<span class="rating">' + gifRating + '</span>' +
                //     '</div>'
                // );

                $(".gifs").append($("<div>").attr("class", "image").html( // add gifs to html(more jQureyie way)
                    '<a href="' + gifURL + '" target="_blank"><img src="' + gifURLThumbnail + '" /></a>' + // gifs are links
                    '<a href="' + gifURL + '" class="rating" target="_blank"><span>' + gifRating + '</span>' 
                ));
            }
        $(".gifSearch").val(""); // clear the text field
        buildSearchButtons();
        }); 
    }
    function buildSearchButtons() { // repopulate header with search term buttons
        $(".searchList").empty();
        for (var i = 0; i < searchList.length; i++) { // for each item in searchList
            $(".searchList").append( // add the button to the header 
            '<button type="submit" class="termButton">' + searchList[i] + '</button>'
            );
        }
        $(".termButton").click(getButtonTerm); // search term button event handler
    }
    function getButtonTerm(event) { // get the gifs that were searched for
        event.preventDefault();
        // console.log($(this).text());

        var searchTerm = $(this).text(); // the search term
        var searchURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&limit=100&api_key=6d635480f9444189bb2125786f5b586b";

        $(".image").empty();
        $.ajax({ // Get the API data
            url: searchURL,
            method: 'GET'
        }).done(function(response) { // Do something with the data
            // console.log(response.data);

            $(".gifs").html('<h3 class ="gifTitle">' + searchTerm + '</h3>'); // title of the group of gifs
            previewSize = $("input[name='size']:checked").attr("value");
            console.log(previewSize);

            for (var i = 0; i < response.data.length; i++) { // Add gifs to html
                var gifURLThumbnail = response.data[i].images[previewSize].url;
                var gifURL = response.data[i].images.original.url;
                var gifRating = response.data[i].rating.toUpperCase(); // gif rating

                // $(".gifs").append( // Html to be appended
                //     '<div class="image">' +
                //     '<a href="' + gifURL + '" target="_blank"><img src="' + gifURLThumbnail + '" /></a>' + // gifs are links
                //     '<span class="rating">' + gifRating + '</span>' +
                //     '</div>'
                // );

                $(".gifs").append($("<div>").attr("class", "image").html( // add gifs to html(more jQureyie way)
                    '<a href="' + gifURL + '" target="_blank"><img src="' + gifURLThumbnail + '" /></a>' + // gifs are links
                    '<a href="' + gifURL + '" class="rating" target="_blank"><span>' + gifRating + '</span>' 
                ));
            }
        }); 
    }
});