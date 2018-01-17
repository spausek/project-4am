function queryProxy(requestUrl, apiKey) {

    const proxy = 'https://proxy.bhsplex.com/';
    let response = undefined;
    var requestUrl = 'http://api.bandsintown.com/artists/Guns%20N%20Roses.json?api_version=2.0&app_id=project-4am';
    $.ajax({
        method: 'GET',
        url: proxy + requestUrl,
        headers: {
            Authorization: 'Bearer ' + apiKey
        }
    }).done(function (data) {
        console.log(data)
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
        } console.log(artist);
        console.log(artistImage);
        console.log(upcomingShowsCount);
    })

    return response;
}
queryProxy();

function queryShows(showRequestUrl, apiKey) {
    const proxy = 'https://proxy.bhsplex.com/';
    let response = undefined;
    var showRequestUrl = "http://api.bandsintown.com/artists/Guns%20N%20Roses/events.json?api_version=2.0&app_id=project-4am";
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

            console.log(shows);
            console.log(showLocation);
            // Geo Coords are here
            console.log(yelpLatitude);
            console.log(yelpLongitude);
            //Back to the boring stuff
            console.log(dateTime);
            console.log(saleDateTime);
            console.log(ticketStatus);
            console.log(ticketUrl);
        }
        console.log(data);
    })
}
queryShows();

//function parseArtistJSON(artistJSON) {


//    var artist = artistJSON.name;
//    var artistImage = artistJSON.thumb_url;
//    var upcomingShowsCount = artistJSON.upcoming_event_count;
//    var artistTourDates = artistJSON.facebook_tour_dates_url;
//    var artistResult = $("<div class='artistRow'>");
//    var artistThumbImg = "<img class='artistImg' src='" + artistImage + "'>";
//    var artistShows = $("<div class='artist-shows' src='" + artistTourDates + "'>");
//    var upcomingShows = $("<div class='showCount'" + upcomingShowsCount + "'>");
//    artistResult.append(artist);
//    artistShows.append(artistTourDates);
//    upcomingShows.append("Upcoming shows: " + upcomingShowsCount);

//    $(".artist").append(artistThumbImg, artistResult, upcomingShows, artistShows);
//    console.log(artist);
//   console.log(artistImage);
//    console.log(upcomingShowsCount);

//}