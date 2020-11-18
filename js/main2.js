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



//calculate radius for each proportional symbol on map
function createSymbols(data, attributes){

    L.geoJson(data, {

        pointToLayer: function(feature, latlng){

            return pointToLayer(feature, latlng, attributes);
        }
    }).addTo(map);
};


//convert points to circles in layer
function pointToLayer(feature, latlng, attributes){
    //creates marker options
    var attribute = attributes[0];

    // styling for the circles which are pink with white borders
    var geojsonMarkerOptions = {
        fillColor: "#800000",
        color: "white",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.5,
    };

    //variable to return the circle marker layer
    var layer = L.circleMarker(latlng, geojsonMarkerOptions);

    // variable to hold popup content values
    var popupContent = createPopupContent(feature.properties, attribute);

    //bind popup to each circle
    layer.bindPopup(popupContent, {
         offset: new L.Point(0,-geojsonMarkerOptions * -20)
     });

    //returns layer with circle markers
    return layer;
};

//function to create content to be shown in popups
function createPopupContent(properties, attribute){

    // variable is equal to a string and the property in the data that relates to it
    var popupContent = "<p><b>Site Name:</b> " + properties.Site + "</p>";

    //returns the variable
    return popupContent;
};

//function to fill the global attribute arrau variable at top of page
function processData(data){

    //variable to store the first feature in the data
    var properties = data.features[0].properties;

    //for loop to push each attribute name into array
    for (var attribute in properties){ // looping through values with an index of "Pop" and pushing them to the array if they have a value greater than 0

        //indexOf will only allow attributes with population values to be pushed
        if (attribute.indexOf("Victims") > -1){
            attributes.push(attribute);

        };
    };

    return attributes; //returns attributes array to be used in callback
};


//function to retrieve the data from geojson
function getData(map){

    //load the data and calls functions
    $.getJSON("data/WarCrimes.geojson", function(response){

      createSymbols(response,attributes);

    });
};



//Loads map when all functions run and are ready for display
$(document).ready(createMap);
