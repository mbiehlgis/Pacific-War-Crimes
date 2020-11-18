var map;
var attributes = []; //making a global attribute variable with an empty array

function createMap(){
    // create map and set parameters
     map = L.map('mapid', {
        center: [20.20, 136.25],
        zoom: 2,
        minZoom: 4,
        maxZoom: 8,
        maxBounds: [(25.2, 115.7), (45.7, 155.54)],
    });

                                //Potential Dark Mode Map//
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    	subdomains: 'abcd',
    	maxZoom: 30
    }).addTo(map);
    map.zoomControl.setPosition('bottomright');

    // calling getData function
    getData(map);

    };


//function to retrieve the data from geojson
function getData(map){

    //load the data and calls functions
    $.getJSON("data/WarCrimes.geojson", function(response){

      // styling for the circles which are pink with white borders
      var geojsonMarkerOptions = {
          fillColor: "#800000",
          color: "white",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.5,
      };

      //create geojson layer for map
      L.geoJson(response, {
        pointToLayer: function (feature, latlng){
          return L.circleMarker(latlng, geojsonMarkerOptions);
        }
      }).addTo(map);
    });
};



//Loads map when all functions run and are ready for display
$(document).ready(createMap);
