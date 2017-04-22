var directionsDisplay;
var directionsService;
var map;

function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById('map'));
    directionsDisplay.setMap(map);

    // var marker = new google.maps.Marker({
    //   position: uluru,
    //   map: map
    // });

    // var start = "chicago, il";
    // var end = "st louis, mo";
    var start_lat = getURLParameter("start_lat");
    var start_lng = getURLParameter("start_lng");
    var end_lat = getURLParameter("end_lat");
    var end_lng = getURLParameter("end_lng");
    // var start = new google.maps.LatLng({lat: start_lat,lng: start_lng});
    // var end = new google.maps.LatLng({lat: end_lat,lng: end_lng}); 
    // var start = new google.maps.LatLng({lat:22.24687649956814,lng:113.87282431125641});
    // var end = new google.maps.LatLng({lat:22.2529765982008,lng:113.86536609381437}); 
    var start = "\"" + start_lat + "," + start_lng + "\"";
    var end = "\"" + end_lat + "," + end_lng + "\"";

    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
        }
    });
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
}


angular.module('path-app', ['firebase'])
    .controller('pathCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$window', function ($scope, $firebaseObject, $firebaseArray, $window) {




    }]);