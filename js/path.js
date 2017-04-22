var directionsDisplay;
var directionsService;
var map;
var routeboxer = null;
var distance = 0.01; // km

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

    // routeboxer = new RouteBoxer();

    var request = {
        origin: start,
        destination: end,
        provideRouteAlternatives: true,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function (result, status) {
        // if (status == 'OK') {
        //     directionsDisplay.setDirections(result);
        // }
        if (status == 'OK') {
            
            console.log(result);
            var colors = ["red","blue","#a4f4ef"];
            for (var i = 0, len = result.routes.length; i < len; i++) {
                new google.maps.DirectionsRenderer({
                    map: map,
                    directions: result,
                    polylineOptions: {strokeColor:colors[i]},
                    routeIndex: i
                });
                // console.log("hi2");
                // var path = result.routes[i].overview_path;
                // var boxes = routeboxer.box(path,distance);
                // console.log(boxes);
                // console.log("hi");
                var infowindow = new google.maps.InfoWindow();
                infowindow.setContent(result.routes[i].legs[0].distance.text+"<br>"+result.routes[i].legs[0].duration.text+"<br>"+colors[i]);
                infowindow.setPosition(result.routes[i].legs[0].steps[parseInt(result.routes[i].legs[0].steps.length*2/3)].end_location);
                infowindow.open(map);
            }
        } else {
            $("#error").append("Unable to retrieve your route<br />");
        }
    });
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
}


angular.module('path-app', ['firebase'])
    .controller('pathCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$window', function ($scope, $firebaseObject, $firebaseArray, $window) {




    }]);