//smooth anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

var map;
var featureId =0;
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

    // custom mapbox studio basemap
    L.tileLayer('https://api.mapbox.com/styles/v1/mbiehlgis/ckgv523ct136019p8cuzmsy8x/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWJpZWhsZ2lzIiwiYSI6ImNrODZwaW9vODBrNWUzZm1jdjJzeHF0OTkifQ.UpFmEKrUbl4A7qD8nuaHUQ', {
        maxZoom: 30,
        accessToken: 'pk.eyJ1IjoibWJpZWhsZ2lzIiwiYSI6ImNrODZwaW9vODBrNWUzZm1jdjJzeHF0OTkifQ.UpFmEKrUbl4A7qD8nuaHUQ'
      }).addTo(map);
    map.zoomControl.setPosition('topright');


    // calling getData function
    getData(map);

    };

function createSymbols(data, attributes){

    L.geoJson(data, {

        pointToLayer: function(feature, latlng){

            return pointToLayer(feature, latlng, attributes);
        }

        // style: function(feature) {
        //
        //     return {
        //       className: feature.properties.id
        //     };
        // }

        // onEachFeature: function (feature, layer) {
        //     layer.markerID = feature.properties.id;
            // this.setAttribute('id', feature.properties.id)
            // layer.setAttribute('id', feature.properties.id);
            // layer.attr('id':feature.properties.id)
            // }
    }).addTo(map);
};

// function onEachFeature(feature, layer) {
//
//     if (feature.properties && feature.properties.id) {
//         document.querySelector(this.setAttribute('id',feature.properties.id));
//     }
//
// }

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

    // //bind popup to each circle ON CLICK
    // layer.bindPopup(popupContent, {
    //      offset: new L.Point(0,-geojsonMarkerOptions * -20)
    //  });

    //bind popup to each circle ON HOVER
    layer.bindTooltip(popupContent, {
      className: 'TooltipClass'
    });

    layer.featureId = featureId++;

    console.log(layer.featureId)

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

//function to fill the global attribute array variable at top of page
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
    $.getJSON("data/WarCrimes3.geojson", function(response){

      createSymbols(response,attributes);

    });
};



//Loads map when all functions run and are ready for display
$(document).ready(createMap);


// EVENT LISTENERS FOR MARKERS ON MAP
// document.querySelector(".AA").addEventListener("click", function() {
//   window.location.href = "#A";
// });

// document.querySelector(".AA")[0].addEventListener("click", function() {
//   window.location.href = "#A";
// });

// document.addEventListener("DOMContentLoaded", function(event) {
//   document.querySelector('.AA').addEventListener("click",function() {
//     window.location.href = "#A"
//   });
// });












// END
