//converts your miles to meters because yelp wants it this way lol
function milesToMeters(miles){

	const metersInAMile = 1610; //rounded to nearest meter
	const meters = miles * metersInAMile;

	return meters;

}

function metersToMiles(meters){

	const metersInAMile = 1610; //rounded up
	const miles = meters / metersInAMile;

	return miles;
}

