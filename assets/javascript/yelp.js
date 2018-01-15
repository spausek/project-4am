function newYelpQuery(){


	const YelpQuery = {


		endpoint : "https://api.yelp.com/v3/businesses/search?",
		key : 'placeholder',
		params : {
			location : "&location=",
			term : "&term=",

		},
		response : undefined,

	}

	return YelpQuery;
}
