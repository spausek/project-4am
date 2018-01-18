function newYelpQuery(){

	const YelpQuery = {

		endpoint : "https://api.yelp.com/v3/businesses/search?",
		key : 'placeholder',
		locations : [],
		params : {
			location : undefined,
			term : "&categories=bars,restaurants",
			radius : undefined,
		},
		 
		
		setLocation : function(location){

			this.params.location = "&location=" + location;
		},
		setRadius : function(miles){
			this.params.radius = "&radius=" + milesToMeters(miles);
		},
		parseLocationData : function(jsonData){

			//work in progress
		},
		query : function(){
			const queryURL = this.endpoint + this.params.location + this.params.term + this.params.radius;
			const key = this.key;
			queryResults = this.parseLocationData(queryProxy(queryURL, key));

		}
	}
	
	return YelpQuery;
}
