var directionsDisplay;
var directionsService;
var map;
var InfoWindow123 = new google.maps.InfoWindow();;
var service;
var routeboxer = null;
var distance = 0.01; // km
var points = [];
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
            points = [];
            console.log(result);
            var colors = ["red","blue","#8c8810"];
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
                infowindow.setPosition(result.routes[i].legs[0].steps[parseInt(result.routes[i].legs[0].steps.length*(i+1)/(result.routes.length+1))].end_location);
                infowindow.open(map);
                for (var j = 0; j< result.routes[i].overview_path.length/10; j++){
                    console.log(j);

                   points.push(result.routes[i].overview_path[j*10]);
                }
            }
            console.log(points);
        } else {
            $("#error").append("Unable to retrieve your route<br />");
        }
    });
    
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
    

}

function putPoints(con){
    var request1;
    service = new google.maps.places.PlacesService(map);
    for(var i = con; i < points.length; i++){
        // var marker = new google.maps.Marker({
        // map: map,
        // position: points[i]
        // });
        request1 = {
            location: points[i],
            radius: 300,
            types: ['restaurant','cafe','shopping_mall']
        }
        console.log("yo");
        service.nearbySearch(request1,callback);
        if(i%10 == 0){
            sleep(1000);
            return putPoints(con+10);
        }
    }
}

function callback(results, status){
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        console.log("yo2");
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          createMarker(results[i]);
        }
    }else{

        console.log(status);
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });



}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
angular.module('path-app', ['firebase'])
    .controller('pathCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$window', function ($scope, $firebaseObject, $firebaseArray, $window) {




    }]);