var directionsDisplay;
var directionsService;
var map;
var InfoWindow123;
var service;
var routeboxer = null;
var distance = 0.01; // km
var points = [];
var overview_paths = [];
var paths_length = [];
var markers = [];
var number_of_paths;

function home() {
    var url = "index.html";
    window.location.href = url;
}

function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById('map'));
    directionsDisplay.setMap(map);
    InfoWindow123 = new google.maps.InfoWindow();
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
            points = [];
            overview_paths = [];
            paths_length = [];
            console.log(result);
            var colors = ["red", "blue", "#8c8810"];
            for (var i = 0, len = result.routes.length; i < len; i++) {
                new google.maps.DirectionsRenderer({
                    map: map,
                    directions: result,
                    polylineOptions: { strokeColor: colors[i] },
                    routeIndex: i
                });
                // console.log("hi2");
                // var path = result.routes[i].overview_path;
                // var boxes = routeboxer.box(path,distance);
                // console.log(boxes);
                // console.log("hi");
                var infowindow = new google.maps.InfoWindow();
                infowindow.setContent(result.routes[i].legs[0].distance.text + "<br>" + result.routes[i].legs[0].duration.text + "<br>" + colors[i]);
                infowindow.setPosition(result.routes[i].legs[0].steps[parseInt(result.routes[i].legs[0].steps.length * (i + 1) / (result.routes.length + 1))].end_location);
                infowindow.open(map);
                // for (var j = 0; j < result.routes[i].overview_path.length / 10; j++) {
                //     console.log(j);
                //     points.push(result.routes[i].overview_path[j * 10]);
                // }
                console.log(result.routes[i]);
                paths_length.push(result.routes[i].legs[0].distance.value);
                overview_paths.push(result.routes[i].overview_path);
            }
            number_of_paths = result.routes.length;
            choosePath(['restaurant', 'cafe', 'shopping_mall', 'natural_feature']);
        } else {
            $("#error").append("Unable to retrieve your route<br/>");
        }

    });

    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);


}


function personalBox(overview_path, box_number) {
    console.log("start");
    var box_size = Math.ceil(overview_path.length / box_number);
    var boxes_of_path = [];
    var j = 0;//current point 
    for (var i = 0; i < box_number; i++) {
        boxes_of_path[i] = { large_lat: -180, small_lat: 180, large_lng: -180, small_lng: 180 };
        k = 0;
        while (k <= box_size) {
            console.log("j=" + j);
            if (j >= overview_path.length) break;
            console.log(overview_path[j].lat(), overview_path[j].lng());
            if (overview_path[j].lat() > boxes_of_path[i].large_lat) boxes_of_path[i].large_lat = overview_path[j].lat();
            if (overview_path[j].lat() < boxes_of_path[i].small_lat) boxes_of_path[i].small_lat = overview_path[j].lat();
            if (overview_path[j].lng() > boxes_of_path[i].large_lng) boxes_of_path[i].large_lng = overview_path[j].lng();
            if (overview_path[j].lng() < boxes_of_path[i].small_lng) boxes_of_path[i].small_lng = overview_path[j].lng();

            // console.log(boxes_of_path[i]);
            j += 1
            if (j > overview_path.length) break;
            k += 1;
            console.log("generatoring " + i + " path");
        }
    }
    return boxes_of_path;
}

function filter(typess){
    choosePath(typess);
}

function choosePath(typess) {
    //TODO
    if(markers[0] != undefined ){
        for(var i = 0 ; i< markers.length;i++){
            markers[i].setMap(null);
        }
    }
    console.log("choosing");
    var shortest = paths_length[0];
    console.log("shortest" + shortest);
    for (var i = 1; i <= number_of_paths; i++) {
        if (paths_length[i] < shortest)
            shortest = paths_length[i];
    }
    for (var i = 1; i <= number_of_paths; i++) {
        if (paths_length[i] > shortest)
            putPoints(i,typess);
    }
}

function putPoints(indexOfPath,typess) {
    var request1;
    service = new google.maps.places.PlacesService(map);
    var boxes = personalBox(overview_paths[indexOfPath], 12);
    for (var i = 0; i < boxes.length; i++) {
        request1 = {
            bounds: new google.maps.LatLngBounds(
                new google.maps.LatLng(boxes[i].small_lat, boxes[i].small_lng),
                new google.maps.LatLng(boxes[i].large_lat, boxes[i].large_lng)
            ),
            types: typess
        }
        console.log("yo: " + boxes[i].small_lat, boxes[i].small_lng, boxes[i].large_lat, boxes[i].large_lng);
        service.nearbySearch(request1, callback);
    }
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        console.log("yo2");
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
    } else {
        console.log(status);
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    markers.push(marker);
    console.log(marker);
    google.maps.event.addListener(marker, 'click', function () {
        InfoWindow123.setContent(place.name);
        InfoWindow123.open(map, this);
    });
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
angular.module('path-app', ['firebase'])
    .controller('pathCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$window', function ($scope, $firebaseObject, $firebaseArray, $window) {




    }]);