

function render_timeline_map() {

    // equake request url
    var equake_request_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
    // fault lines request url
    var faultlines_request_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

    //  get request for quake data
    d3.json(equake_request_url).then(function (data) {
        var equake_features = data.features;


        // add circles
        var equake_layer = L.geoJSON(equake_features, {
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
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.place + "<br> Magnitude: " + feature.properties.mag)
            }
        });


        d3.json(faultlines_request_url).then(function (data) {

            var faultline_features = data.features

            var faultline_style = {
                "fillOpacity": 0,
                "weight": 1,
                "color": "black"
            };

            console.log(faultline_features);
            var faultline_layer = L.geoJSON(faultline_features, {
                style: function (feature) {
                    return faultline_style
                }
            });


            create_map(timeline_map_element_id, equake_layer, faultline_layer)
        });

    });

// console.log(quakesLayer)
    function get_color(d) {
        return d > 5 ? '#E31A1C' :
            d > 4 ? '#FC4E2A' :
                d > 3 ? '#FD8D3C' :
                    d > 2 ? '#FEB24C' :
                        d > 1 ? '#FED976' :
                            '#FFEDA0';
    }

    function get_radius(value) {
        return value * 60000
    }

    console.log("made it here")

// var quakeMarkers = L.layerGroup(quakeMarkers);

    function create_map(element_id, equake_layer, faultline_layer) {
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

        // console.log(document.getElementById(element_id).innerText)
        var map = L.map(element_id, {
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

        // update card header
        let card_header_title = '<i class="fas fa-map"></i> Earthquak Magnitudes/Fault Line over last 7 days';
        document.getElementById(element_id + "-header").innerHTML = card_header_title

        // update card footer
        let elems = document.getElementsByClassName("card-footer");
        let current_date = new Date();
        for (let i = 0; i < elems.length; i++) {
            elems[i].innerText = "Updated at " +
                (current_date.getMonth() + 1) + " " +
                current_date.getDate() + "/" +
                current_date.getFullYear() + " @ " +
                current_date.getHours() + ":" +
                current_date.getMinutes() + ":"
                + current_date.getSeconds();
        }
    }

}

