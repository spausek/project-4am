$(document).ready(function () {
    
function queryProxy(requestUrl, apiKey) {

    const proxy = 'https://proxy.bhsplex.com/';
    let response = undefined;
    var requestUrl = 'http://api.bandsintown.com/artists/' + artistSearchTerm + '.json?api_version=2.0&app_id=project-4am';
    $.ajax({
        method: 'GET',
        url: proxy + requestUrl,
        headers: {
            Authorization: 'Bearer ' + apiKey
        }
    }).done(function (data) {
        response = data;
        for (var i = 0; i < 1; i++) {
            var artist = data.name;
            var artistImage = data.thumb_url;
            var upcomingShowsCount = data.upcoming_event_count;
            var artistTourDates = data.facebook_tour_dates_url;
            var artistResult = $("<div class='artistRow'>");
            var artistThumbImg = "<img class='artistImg' src='" + artistImage + "'>";
            var artistShows = $("<div class='artist-shows' src='" + artistTourDates + "'>");
            var upcomingShows = $("<div class='showCount'" + upcomingShowsCount + "'>");
            artistResult.append(artist);
            artistShows.append(artistTourDates);
            upcomingShows.append("Upcoming shows: " + upcomingShowsCount);
            $(".artist").append(artistThumbImg, artistResult, upcomingShows, artistShows);
        }
    })

    return response;
}



function queryShows(showRequestUrl, apiKey) {
    const proxy = 'https://proxy.bhsplex.com/';
    let response = undefined;
    var showRequestUrl = "http://api.bandsintown.com/artists/" + artistSearchTerm + "/events.json?api_version=2.0&app_id=project-4am";
    $.ajax({
        method: "GET",
        url: proxy + showRequestUrl,
        headers: {
            Authorization: "Bearer " + apiKey
        }

    }).done(function (data) {
        for (var i = 0; i < data.length; i++) {
            var shows = data[i].title;
            var showLocation = data[i].formatted_location;
            var dateTime = data[i].formatted_datetime;
            var saleDateTime = data[i].on_sale_datetime;
            var ticketStatus = data[i].ticket_status;
            var ticketUrl = data[i].ticket_url;
            //These are the coordinates you want to precisely locate where the event is. If you dont need these and would prefer
            //a venue name, let me know and I'll fix it.
            var yelpLatitude = data[i].venue.latitude;
            var yelpLongitude = data[i].venue.longitude;
            //Back to the boring stuff
            var artistShowHeadline = $("<div class='show-headline'>");
            var artistShowLocation = $("<div class='show-location'>");
            var showDateTime = $("<div class='show-date-time'>");
            var artistTicketStatus = $("<div class='ticket-status'>");
            artistShowHeadline.append(shows);
            artistShowLocation.append(showLocation);
            showDateTime.append(dateTime);
            artistTicketStatus.append("Ticket availability: " + ticketStatus);
            $(".artist").append(artistShowHeadline, artistShowLocation, showDateTime, artistTicketStatus);
        }
    })
}

$("#artistSearch").on("click", function () {
    event.preventDefault();
    var artistTerm = $("#userInput").val().trim();
    artistSearchTerm = artistTerm.split(" ").join("%20");
    $("#userInput").val("");
    $(".artist").empty();
    queryProxy(artistSearchTerm);
    queryShows(artistSearchTerm);
})
})