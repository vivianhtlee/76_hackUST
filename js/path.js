var directionsDisplay;
var directionsService;
var map;

function initMap() {
    // var uluru = { lat: -25.363, lng: 131.044 };
    // var map = new google.maps.Map(document.getElementById('map'), {
    //   zoom: 4,
    //   center: uluru
    // });
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
    var start = "22.24687649956814,113.87282431125641"; 
    var end =  "22.2529765982008,113.86536609381437";
    // {lat: -34.397, lng: 150.644};

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
}


angular.module('path-app', ['firebase'])
    .controller('pathCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$window', function ($scope, $firebaseObject, $firebaseArray, $window) {




    }]);