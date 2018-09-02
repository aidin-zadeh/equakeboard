

// access token
var access_token = "pk.eyJ1IjoiYWlkaW5yYWFkIiwiYSI6ImNqa2l4cGk5bjVwZmszbG1sNTU2Nmh5ZjUifQ.oFfyS5HN-ru_gAI7eo_AKg";
// var access_token = "pk.eyJ1IjoicmFjcXVlc3RhIiwiYSI6ImNqYWs5emMwYjJpM2EyenBsaWRjZ21ud2gifQ.af0ky4cpslCbwe--lCrjZA";
// earthquake data request url
var equake_request_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// fault lines data request url
var faultlines_rquest_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/P2002_plates.json";

// custom mapbox curls
var satellite_map_curl = "https://api.mapbox.com/styles/v1/aidinraad/cjlkld9ar34zc2rlgnd9i4zl1/tiles/256/{z}/{x}/{y}?access_token={accessToken}";
var light_map_curl = "https://api.mapbox.com/styles/v1/aidinraad/cjlklb3w535382rojjoe83mi3/tiles/256/{z}/{x}/{y}?access_token={accessToken}";
var outdoorw_map_curl = "https://api.mapbox.com/styles/v1/aidinraad/cjlkl7icy33jb2spela6ekilk/tiles/256/{z}/{x}/{y}?access_token={accessToken}";
var terrain_map_curl = "https://api.mapbox.com/styles/v1/aidinraad/cjlkkaj1e3i8l2spjlp0jjk7f/tiles/256/{z}/{x}/{y}?access_token={accessToken}";

var equake_map_element_id = "equake-map";
var timeline_map_element_id = "timeline-map";


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


var $equake_magnitude_link = document.getElementById("equake-magnitude-link");
var $equake_timeline_link = document.getElementById("equake-timeline-link");