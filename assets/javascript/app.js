$(document).ready(function() {
    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=6d635480f9444189bb2125786f5b586b";
    var searchList = ["Trending"];

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {
        console.log(response.data);

        for (var i = 0; i < response.data.length; i++) {
            var gifURL = response.data[i].images.fixed_height_small.url;
            var gifRating = response.data[i].rating.toUpperCase();

            $(".gifs").append(
                '<div class="image">' +
                '<img src="' + gifURL + '" />' +
                '<span class="rating">' + gifRating + '</span>' +
                '</div>'
            );
        }

        $(".gifSearchButton").click(clickGifSearchButton);
    });

    buildSearchButtons();       

    function clickGifSearchButton(event) {
        event.preventDefault();
        console.log($(".gifSearch").val());
        searchList.push($(".gifSearch").val());
        $(".searchList").empty();
        $(".gifSearch")
        buildSearchButtons();
    }
    function buildSearchButtons() {
        for (var i = 0; i < searchList.length; i++) {
            $(".searchList").append(
            '<button>' + searchList[i] + '</button>'
            );
        }
    }    
});