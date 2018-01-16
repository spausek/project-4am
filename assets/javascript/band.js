function queryBIT() {

    // the cors proxy to enable  API requests
    // this proxy is running on my personal server... please do not share this with others
    const proxy = 'https://proxy.bhsplex.com/'
    // yelp search api
    const url = 'http://api.bandsintown.com/artists/Guns%20N%20Roses.json?api_version=2.0&app_id=project-4am'; //example
    // query parameters

    var qs = '?term='

    $.ajax({
        method: 'GET',
        //adding our bandsintown URL to the proxy
        url: proxy + url,

    })
        .done(function (data) {
            //print out the data
            for (i = 0; i < 10; i++){
                var artistName = data.name;
                var artistImage = data.thumb_url;
                var artistTourDates = data.facebook_tour_dates_url;
                var upcomingShowsCount = data.upcoming_event_count;

            } console.log(data);
            console.log(artistName);
            console.log(artistImage);
            console.log(artistTourDates);
            console.log(upcomingShowsCount);
        })

}
queryBIT();