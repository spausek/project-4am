function createCardHandler(){

	const CardHandler = {

		cardList : [],
		cardContainer : $('.card-container'),

		showCards : function(){
			const CardHandler = this;
			CardHandler.cardList.map(function(card){CardHandler.cardContainer.append(card)});
		},
		clearCards : function(){
			this.cardContainer.empty();
			this.cardList = [];
		}


	}


}

function createCard(business){

	const Card = {

		name : business.name,
		location : business.location,
		imageURL : business.imageURL,
		yelpURL : business.url,
		element : undefined,
		createCardElement : function(){
			this.element = '';
			this.element +='<div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">';
			this.element += '<div class="mdl-card__media">'
            this.element += '<img src="' + this.imageURL + '">';
            this.element += '</div>';
            this.element += '<div class="mdl-card__title">';
            this.element += '<h4 class="mdl-card__title-text">' + this.name + '</h4>';
            this.element += '</div>';
            this.element += '<div class="mdl-card__supporting-text">';
            this.element += '<span class="mdl-typography--font-light mdl-typography--subhead">info about option 2</span>';
            this.element += '</div>';
            this.element += '<div class="mdl-card__actions">';
            this.element += '<a class="web-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="' + this.yelpURL + '">';
            this.element += 'Let\'s Eat!';
            this.element += '<i class="material-icons">chevron_right</i>';
            this.element += '</a>';
            this.element += '</div>';
            this.element += '</div>';



		}

	}

	Card.createCardElement();


	return Card;

}

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

			this.params.location = "&location=" + venue;//"&location=" + venue.address1 + "," + venue.city + "," + venue.state;
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
				this.offsetNumber = 0;
			}
			else{
				this.offsetNumber = offset;
			}
			
			this.params.offset = "&offset="+this.offsetNumber;
		},
		parseLocationData : function(jsonData){
			const YelpQuery = this;
			YelpQuery.businesses = [];
			YelpQuery.totalResults = jsonData.total;

			jsonData.businesses.map(function(business){
				YelpQuery.businesses.push(createBusiness(business))
			});
		},
		queryMore : function(){
			this.setOffset(this.limitNumber + this.offsetNumber);
			this.queryBusinesses();
			console.log("Querying more!" + "\n Offset: " + this.offsetNumber);
		},
		queryLess : function(){
			this.setOffset(this.offsetNumber - this.limitNumber);
			this.queryBusinesses();
			console.log("Querying less!" + "\n Offset: " + this.offsetNumber);
		},
		createQueryURL : function(){
			let queryURL = this.endpoint + this.params.location + this.params.term + this.params.radius;
			queryURL += this.params.limit + this.params.offset;
			
			return queryURL;
		},
		queryBusinesses(){
			$("#loadModal").modal("show");
			const YelpQuery = this;
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
		        const Card = createCard(YelpQuery.businesses[0]);
		        $('.web-card-container').append(Card.element);
		        $("#loadModal").modal("hide");
		    });
		}
	}
	
	return YelpQuery;
}

$(document).ready(function () {
/*
	const YelpQuery = newYelpQuery();
	YelpQuery.setLocationAddress("Los Angeles, California");
	YelpQuery.setRadius(1);
	YelpQuery.queryBusinesses();

	$(document).on("click",".load-more-btn",function(){
		YelpQuery.queryMore();
	});

	$(document).on("click",".load-less-btn",function(){
		YelpQuery.queryLess();
	});

	*/
});