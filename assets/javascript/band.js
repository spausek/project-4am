$(document).ready(function () {

$(".main-artist").hide();
$("#instOne").hide();

function queryProxy(requestUrl, apiKey) {
    $("#loadModal").modal("show");
    const proxy = 'https://still-fortress-80643.herokuapp.com/';
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
            $(".main-artist").append(artistThumbImg, artistResult, upcomingShows);
        }
        $("#loadModal").modal("hide");
    })

    return response;
}



function queryShows(showRequestUrl, apiKey) {
    $("#loadModal").modal("show");
    const proxy = 'https://still-fortress-80643.herokuapp.com/';
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
            //push data to arrays stored globally on maps.js
            //latitudeData.push(yelpLatitude);
            //longitudeData.push(yelpLongitude);
            //create map marker
            //var marker = new google.maps.Marker({
            //    position:{lat: latitudeData[i], lng: longitudeData[i]},
            //    map: map
            //});
            //Back to the boring stuff
            var artistShowHeadline = $("<div class='show-headline'>");
            var artistShowLocation = $("<div class='show-location'>");
            var showDateTime = $("<div class='show-date-time'>");
            var artistTicketStatus = $("<div class='ticket-status'>");
            var buyTickets = $("<a class='buy-tickets' href=" + ticketUrl + " target='_blank'> Buy Tickets </a>");
            artistShowHeadline.append(shows);
            artistShowLocation.append(showLocation);
            showDateTime.append(dateTime);
            artistTicketStatus.append("Ticket availability: " + ticketStatus.toUpperCase());
            $(".main-artist").append(artistShowHeadline, artistShowLocation, showDateTime, artistTicketStatus, buyTickets);
            $("#loadModal").modal("hide");
        }
            //Creates a center point at the first map coordinates
            //var firstMap = {lat: latitudeData[0], lng: longitudeData[0]};
            //map.setCenter(firstMap);
    })
}

$("#initializeSearch").on("click", function () {
    event.preventDefault();
    var artistTerm = $("#formSearch").val().trim();
    artistSearchTerm = artistTerm.split(" ").join("%20");
    $(".main-artist").empty();
    function emptyInput() {
        if ($("#formSearch").val() === "") {
            $("#loadModal").modal("hide");
            $(".main-artist").hide();
            $("#myModal").modal();
            return false;
        }else {
            return true;
        }
    }
    var instructionOne = "Click on a show & see where to eat!";
    queryProxy(artistSearchTerm);
    queryShows(artistSearchTerm);
    $(".main-artist").show();
    emptyInput();
    $("#formSearch").val("");
    $("#formSearch").empty();
    $("#instOne").append(instructionOne);
    $("#instOne").show();
})


//This is what should be clicked to display the Yelp info
$("").on("click", function () {
    event.preventDefault();
    $("").empty();
    $("").show();
})

})