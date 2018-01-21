//Global Variable

var latitudeData = [];
console.log(latitudeData);
var longitudeData = [];
console.log(latitudeData);
var firstMap;

// Creaters the object for the google map API function to consume

function createMap (){
        var firstMap = {lat:latitudeData[0], lng:longitudeData[0]};
        console.log(firstMap);
        initMap(firstMap);
        }

//Generates map
        
function initMap(firstMap){
        var newMap = {
            zoom: 6,
            center:firstMap
            };

// still need to trouble shoot marker creation

console.log(firstMap);
        var marker = new google.maps.Marker({
            position: firstMap,
            newMap: newMap
            });
            
        var map = new google.maps.Map(document.getElementById('map'), newMap);
        }

// function to make multiple markers for concert locations. 