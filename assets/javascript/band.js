$(document).ready(function () {

const YelpQuery = newYelpQuery();

//Hides artist info and eateries until onclick event
$(".event.list").hide();
$("#instOne").hide();
$(".artist-container").hide();
$("#yelp-locations").hide();
$("#queryLessButton").hide();
$("#queryMoreButton").hide();

//Bands in Town API, prints artist photo and number of shows to the HTML
function queryProxy(requestUrl, apiKey) {
    $("#loadModal").modal("show");
    const proxy = 'https://still-fortress-80643.herokuapp.com/';
    let response = undefined;
    var requestUrl = 'http://api.bandsintown.com/artists/' + artistSearchTerm + '.json?api_version=2.0&app_id=project-4am';

//Ajax call
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
            var artistResult = $("<div class='artistRow'>");
            var artistThumbImg = "<img class='artistImg' src='" + artistImage + "' alt='artist' >";
            var upcomingShows = $("<div class='showCount'" + upcomingShowsCount + "'>");
            artistResult.append(artist);
            upcomingShows.append("Upcoming Shows: " + upcomingShowsCount);
            $(".artist-photo").append(artistThumbImg);
            $(".artist-name").append(artistResult, upcomingShows);
        }

        createCardHandler().clearCards();
        YelpQuery.reset();
        $("#loadModal").modal("hide");
    })

    return response;
}


//Ajax that prints the shows, location, date/time, availability of tix, link to purchase tix
function queryShows(showRequestUrl, apiKey) {

    $("#loadModal").modal("show");
    $("#event-table").hide();
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
            var venueName = data[i].venue.name;
            var dateTime = data[i].formatted_datetime;
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
            var rows = $("<tr class='rowOne'>");
            var artistShowHeadline = $("<td class='show-headline'>");
            var artistShowLocation = $("<td class='show-location'>");
            var showDateTime = $("<td class='show-date-time'>");
            var artistTicketStatus = $("<td class='ticket-status'>");
            var buyTickets = $("<a class='buy-tickets' href=" + ticketUrl + " target='_blank'> Buy Tickets </a>");
            rows.prepend(artistShowHeadline);
            artistShowHeadline.append("<a id='dinnerPlans' venue-name='" + venueName + "' longitude='" + yelpLongitude + "' latitude='" + yelpLatitude + "'>" + shows + "</a>");
            artistShowLocation.append(showLocation);
            showDateTime.append(dateTime);
            artistTicketStatus.append(ticketStatus.toUpperCase());
            $(".event-list").append(rows, artistShowHeadline, artistShowLocation, showDateTime, artistTicketStatus, buyTickets);
           
           
        }
             
             $("#loadModal").modal("hide");
            //Creates a center point at the first map coordinates
            //var firstMap = {lat: latitudeData[0], lng: longitudeData[0]};
            //map.setCenter(firstMap);
    })
}

//originally inside of the onclick. 
//I added it to a function so that we could reuuse it for the enter key submission
function initializeSearch(){

    event.preventDefault();
    var artistTerm = $("#formSearch").val().trim();
    artistSearchTerm = artistTerm.split(" ").join("%20");
    $(".event-list").empty();
    $(".artist-photo").empty();
    $(".artist-name").empty();
    createCardHandler().clearCards();
    
        if ($("#formSearch").val() === "" || $("#formSearch").val() === null) {
            $("#loadModal").modal("hide");
            $("#instOne").hide();
            $(".event-list").hide();
            $("#myModal").modal();
            $("#event-table").hide();
            $("#yelp-locations").hide();
            
        }else {
            $("#instOne").show();
            $("#event-table").show();
            var instructionOne = "Click on a show, see where to eat!";
            queryProxy(artistSearchTerm);
            queryShows(artistSearchTerm);
            $(".artist-container").show();
            $(".event-list").show();
            $("#event-table").show();
            $("#formSearch").val("");
            $("#instOne").empty();
            $("#instOne").append(instructionOne);
            $("#yelp-locations").hide();
        }
    
    

};




//Onclick to search for artist, display the results
$("#initializeSearch").on("click", function () {
    initializeSearch();
})
//When they press enter, also run initializeSearch
$(document).keypress(function(event) {
    if(event.which === 13) {
        initializeSearch();
    }
});

//Onclick to display Yelp info
$(document).on("click", "#dinnerPlans", function () {
    
    event.preventDefault();
    var instructionTwo = "Great! Now see where you can eat.";
    $("#yelp-locations").show();
    $(".event-list").show();
    $("#instOne").empty();
    $("#instOne").append(instructionTwo);
    $("#instOne").show();
    //const YelpQuery = newYelpQuery();
    const venueName = $(this).attr('venue-name');
    createCardHandler().updateVenueTitle($(this).attr('venue-name'));
    YelpQuery.setLocationCoords({
        latitude:$(this).attr('latitude'),
        longitude:$(this).attr('longitude')});
    YelpQuery.setRadius(5);
    YelpQuery.setOffset(0);
    YelpQuery.queryBusinesses();

    
})


$(document).on("click","#queryMoreButton", function(){

    YelpQuery.queryMore();
    if(YelpQuery.offsetNumber > 0){
        $("#queryLessButton").show();
    }

});


$(document).on("click","#queryLessButton", function(){

    if(YelpQuery.offsetNumber > 0){

        YelpQuery.queryLess();
    }
    
    

});

})