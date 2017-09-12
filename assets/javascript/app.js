$(document).ready(function() {
    var queryURL = "https://api.giphy.com/v1/gifs/trending?limit=25&api_key=6d635480f9444189bb2125786f5b586b";
    var searchList = ["Cats", "Dogs", "No", "Yes", "Happy", "Mad", "Crying", "Scared"];
    var gifReturnCount = $(".numberOfGifs").val();
    var searchTermGlobal = "Cats";

    $(".small").attr("checked", true);
    var previewSize = $("input[name='size']:checked").attr("value");

    $(".gifAddButton").click(clickGifAddButton); // Click handlers
    $(".gifSearchButton").click(clickGifSearchButton);
    $(".refresh").click(refresh);

    $.ajax({ // Get the API data
        url: queryURL,
        method: 'GET'
    }).done(function(response) { // Do something with the data
        // console.log(response.data);

        $(".gifs").html('<h3 class ="gifTitle">Trending</h3>'); // title of gifs searched for
        gifReturnCount = $(".numberOfGifs").val();

        for (var i = 0; i < response.data.length; i++) { // Add gifs to html
            var gifURLThumbnail = response.data[i].images[previewSize].url;
            var gifURL = response.data[i].images.original.url;
            var gifRating = response.data[i].rating.toUpperCase();

            $(".gifs").append($("<div>").attr("class", "image").html( // add gifs to html
                '<a href="' + gifURL + '" target="_blank"><img src="' + gifURLThumbnail + '" /></a>' + // make gifs links
                '<a href="' + gifURL + '" class="rating" target="_blank"><span>' + gifRating + '</span>' 
            ));
        }
    }); 

    buildSearchButtons();

    function clickGifAddButton(event) { // push search term into searchList array
        event.preventDefault();
        // console.log($(".gifSearch").val());
        if ($(".gifSearch").val() !== "") {
            searchList.push($(".gifSearch").val()); // add the search term to the array
            $(".gifSearch").val(""); // clear the text field
            buildSearchButtons();
        }
    }
    function clickGifSearchButton(event) { // push search term into searchList array and immediately run the search
        event.preventDefault();
        // console.log($(".gifSearch").val());
        if ($(".gifSearch").val() !== "") {
            searchList.push($(".gifSearch").val()); // add the search term to the array

            var searchTerm = $(".gifSearch").val(); // the search term
            searchTermGlobal = searchTerm; // send to global variable
            gifReturnCount = $(".numberOfGifs").val(); // number of gifs to return
            // console.log(gifReturnCount);
            var searchURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&limit=" + gifReturnCount + "&api_key=6d635480f9444189bb2125786f5b586b";

            $(".image").empty();
            $.ajax({ // Get the API data
                url: searchURL,
                method: 'GET'
            }).done(function(response) { // Do something with the data
                // console.log(response.data);

                $(".gifs").html(
                    '<h3 class ="gifTitle" ID="searchTermTitle">' + searchTerm + '<button class="clearButton">X</button></h3>'
                ); // title of the group of gifs
                $(".clearButton").click(clearTermButton); // clear button event handler

                previewSize = $("input[name='size']:checked").attr("value");

                for (var i = 0; i < response.data.length; i++) { // Add gifs to html
                    var gifURLThumbnail = response.data[i].images[previewSize].url;
                    var gifURL = response.data[i].images.original.url;
                    var gifRating = response.data[i].rating.toUpperCase(); // gif rating

                    $(".gifs").append($("<div>").attr("class", "image").html( // add gifs to html(more jQureyie way)
                        '<a href="' + gifURL + '" target="_blank"><img src="' + gifURLThumbnail + '" /></a>' + // gifs are links
                        '<a href="' + gifURL + '" class="rating" target="_blank"><span>' + gifRating + '</span>' 
                    ));
                }
            $(".gifSearch").val(""); // clear the text field
            buildSearchButtons();
            }); 
        }
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
        searchTermGlobal = searchTerm; // send to gloabal variable
        gifReturnCount = $(".numberOfGifs").val(); // number of gifs to return
        console.log(gifReturnCount);
        var searchURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&limit=" + gifReturnCount + "&api_key=6d635480f9444189bb2125786f5b586b";

        $(".image").empty();
        $.ajax({ // Get the API data
            url: searchURL,
            method: 'GET'
        }).done(function(response) { // Do something with the data
            // console.log(response.data);

            $(".gifs").html(
                '<h3 class ="gifTitle" ID="searchTermTitle">' + searchTerm + '<button class="clearButton">X</button></h3>'
            ); // title of the group of gifs
            $(".clearButton").click(clearTermButton); // Clear button event handler

            previewSize = $("input[name='size']:checked").attr("value");

            for (var i = 0; i < response.data.length; i++) { // Add gifs to html
                var gifURLThumbnail = response.data[i].images[previewSize].url;
                var gifURL = response.data[i].images.original.url;
                var gifRating = response.data[i].rating.toUpperCase(); // gif rating

                $(".gifs").append($("<div>").attr("class", "image").html( // add gifs to html(more jQureyie way)
                    '<a href="' + gifURL + '" target="_blank"><img src="' + gifURLThumbnail + '" /></a>' + // gifs are links
                    '<a href="' + gifURL + '" class="rating" target="_blank"><span>' + gifRating + '</span>' 
                ));
            }
        }); 
    }
    function clearTermButton() {
        console.log("Clear button clicked");
        searchList.splice(searchList.indexOf(searchTermGlobal), 1);
        $(".image").empty(); 
        $('#searchTermTitle').empty();       
        buildSearchButtons();
    }
    function refresh(event) {
        event.preventDefault();

        var searchTerm = searchTermGlobal; // the search term
        gifReturnCount = $(".numberOfGifs").val(); // number of gifs to return
        console.log(gifReturnCount);
        var searchURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&limit=" + gifReturnCount + "&api_key=6d635480f9444189bb2125786f5b586b";

        $(".image").empty();
        $.ajax({ // Get the API data
            url: searchURL,
            method: 'GET'
        }).done(function(response) { // Do something with the data
            // console.log(response.data);

            $(".gifs").html(
                '<h3 class ="gifTitle" ID="searchTermTitle">' + searchTerm + '<button class="clearButton">X</button></h3>'
            ); // title of the group of gifs
            $(".clearButton").click(clearTermButton); // Clear button event handler

            previewSize = $("input[name='size']:checked").attr("value");

            for (var i = 0; i < response.data.length; i++) { // Add gifs to html
                var gifURLThumbnail = response.data[i].images[previewSize].url;
                var gifURL = response.data[i].images.original.url;
                var gifRating = response.data[i].rating.toUpperCase(); // gif rating

                $(".gifs").append($("<div>").attr("class", "image").html( // add gifs to html(more jQureyie way)
                    '<a href="' + gifURL + '" target="_blank"><img src="' + gifURLThumbnail + '" /></a>' + // gifs are links
                    '<a href="' + gifURL + '" class="rating" target="_blank"><span>' + gifRating + '</span>' 
                ));
            }
        });
    }
});