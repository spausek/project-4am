function queryProxy(requestURL, apiKey){

	const proxy = 'https://proxy.bhsplex.com/';
	let response = undefined;

	$.ajax({
        method: 'GET',
        // we simply append the yelp url to the proxy url
        url: proxy + requestURL,
        // doesn't matter if there's no key for bandsintown, it will just be null
        headers: {
            Authorization: 'Bearer ' + apiKey
        }
    })
    .done(function(data) {

        console.log(data)
        response = data;
    })

   return response;
}


//converts your miles to meters because yelp wants it this way lol
function milesToMeters(miles){

	const metersInAMile = 1610; //rounded to nearest meter
	const meters = miles * metersInAMile;

	return meters;

}


