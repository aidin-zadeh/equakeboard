
// creat base maps
var satellite_map = L.tileLayer(satellite_map_curl, {
    accessToken: access_token,
    maxZoom: 18
});
var light_map = L.tileLayer(light_map_curl, {
    accessToken: access_token,
    maxZoom: 18
});
var outdoors_map = L.tileLayer(outdoorw_map_curl, {
    accessToken: access_token,
    maxZoom: 18
});
var terrain_map = L.tileLayer(terrain_map_curl, {
    accessToken: access_token,
    maxZoom: 18
});


// quake data link
var equake_request_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// fault lines data link
var faultlines_request_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"


//  get request for quake data
d3.json(equake_request_url).then(function(data){
    var quake_features = data.features


    // add circles
    var equake_layer = L.geoJSON(quake_features, {
        pointToLayer: function (feature, latlng) {
            return new L.circle(latlng,
                {
                    radius: get_radius(feature.properties.mag),
                    fillColor: get_color(feature.properties.mag),
                    fillOpacity: 0.6,
                    stroke: false,
                    color: "black",
                    weight: .5

                })
        },
        // add popups
        onEachFeature: function (feature, layer){
            layer.bindPopup(feature.properties.place + "<br> Magnitude: " + feature.properties.mag)
        }
    });



    d3.json(faultlines_request_url).then(function(data){

        var faultline_features = data.features

        var faultline_style = {
            "fillOpacity": 0,
            "weight": 1,
            "color": "black"
        };

        console.log(faultline_features)
        var faultlin_layer = L.geoJSON(faultline_features, {
            style: function(feature){
                return faultline_style
            }
        });


        createMap(equake_layer, faultlin_layer)
    })


});

// console.log(quakesLayer)
function get_color(d) {
    return d > 5  ? '#E31A1C' :
        d > 4  ? '#FC4E2A' :
            d > 3   ? '#FD8D3C' :
                d > 2   ? '#FEB24C' :
                    d > 1   ? '#FED976' :
                        '#FFEDA0';
}

function get_radius(value){
    return value*60000
}
console.log("made it here")
// var quakeMarkers = L.layerGroup(quakeMarkers);

function createMap(equake_layer, faultline_layer){
    var base_maps = {
        "Outdoor Map": outdoors_map,
        "Grayscale Map": light_map,
        "Satelite Map": satellite_map,
        "Terrain Map": terrain_map
    };

    var overlay_maps = {
        "Earthquakes": equake_layer,
        "Fault Lines": faultline_layer

    };
    var map = L.map('mapid', {
        center: [42.877742, -97.380979],
        zoom: 2.5,
        minZoom: 2.5,
        layers: [light_map, faultline_layer, equake_layer],
        maxBounds: L.latLngBounds([90, -180], [-90, 180]),
        maxBoundsViscosity: 1,
        scrollWheelZoom: false

    });

    // create legend
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (mymap) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 1, 2, 3, 4, 5],
            labels = [];

        div.innerHTML += '<p><u>Magnitude</u></p>'

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + get_color(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);

    L.control.layers(base_maps, overlay_maps, {
        collapsed: false
    }).addTo(map);
}


