function createBusiness(jsonBusiness){

	const Business = {
		name: jsonBusiness.name,
		phone: jsonBusiness.phone,
		price : jsonBusiness.price,
		rating : jsonBusiness.rating,
		yelpURL : jsonBusiness.url,
		imageURL : jsonBusiness.image_url,
		location : jsonBusiness.location,
		distance : metersToMiles(jsonBusiness.distance),

	}

	return Business;
}

//let YelpQuery = newYelpQuery();
// YelpQuery.setLocationCoords(venue)
//YelpQuery.setRadius(miles)
//YelpQuery.queryBusinesses(YelpQuery)
function newYelpQuery(){

	const YelpQuery = {

		endpoint : "https://api.yelp.com/v3/businesses/search?",
		key : 'placeholder',
		businesses : [],
		currentOffset : 0,
		totalResults: 0,
		limitNumber : 25,
		offsetNumber : 0,
		params : {
			address : undefined,
			latitude: undefined,
			longitude: undefined,
			term : "&categories=bars,restaurants",
			radius : undefined,
			offset: "&offset=0",
			limit: "&limit=25", //25 per page/search
		},
		 

		setLocationAddress : function(venue){
			this.params.location = "&location=" + venue.address1 + "," + venue.city + "," + venue.state;
		},
		setLocationCoords : function(venue){
			this.params.latitude = "&latitude=" + venue.latitude;
			this.params.longitude = "&longitude=" + venue.longitude;
		},
		setRadius : function(miles){
			this.params.radius = "&radius=" + milesToMeters(miles);
		},
		setOffset : function(offset){
			if(offset < 0){
				offset = 0;
			}
			this.offsetNumber += offset;
			this.params.offset = "&offset="+offset;
		},
		parseLocationData : function(jsonData){
			const YelpQuery = this;
			this.totalResults = jsonData.total;

			jsonData.businesses.map(function(business){
				YelpQuery.businesses.push(createBusiness(business))
			});

		},
		queryMore : function(){
			setOffset(limitNumber);
			queryBusinesses(this);
		},
		queryLess : function(){
			setOffset(offsetNumber - limitNumber);
			querBusinesses(this);
		},
		createQueryURL : function(){
			let queryURL = this.endpoint + this.params.location + this.params.term + this.params.radius;
			queryURL += this.params.limit + this.params.offset;
			
			return queryURL;
		},
		queryBusinesses(YelpQuery){
		    const proxy =  'https://still-fortress-80643.herokuapp.com/';
		    let response = undefined;

		    $.ajax({
		        method: 'GET',
		        url: proxy + YelpQuery.createQueryURL(),
		        headers: {
		            Authorization: 'Bearer ' + YelpQuery.key
		        }
		    })
		    .done(function(data) {

		        YelpQuery.parseLocationData(data);
		        console.log(YelpQuery.businesses);
		    });
		}
	}
	
	return YelpQuery;
}

