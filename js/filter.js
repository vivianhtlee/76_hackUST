var app = angular.module("filter",["firebase"]);

app.controller("FilterCtrl", function($scope, $firebaseObject){
	//var ref = firebase.database().ref();

	var Marker = [];
	var service;
	var  infoWindow = new google.maps.InfoWindow();
	console.log("loaded");
	var user_location = new google.maps.LatLng(22.336299,114.265367 );
	console.log(user_location.toString());
    $scope.map = new google.maps.Map(document.getElementById('map'), {
          center: user_location,
          zoom: 15
       });
    

	$scope.findfood = function() {
		console.log("Load food");
		clearMarkers();
		$scope.map.setCenter(user_location);
		var request = {
		   	location: user_location,
	   		radius: '5',
	   		query: 'restaurant'
		};
		service = new google.maps.places.PlacesService($scope.map);
	  	service.textSearch(request, callback);
	};

	$scope.findshopping = function() {
		console.log("Load shopping");
		clearMarkers();
		$scope.map.setCenter(user_location);
		var request = {
		    location: user_location,
			radius: '5',
		    query: 'shopping_mall'
		};
		service = new google.maps.places.PlacesService($scope.map);
		service.textSearch(request, callback);
	};

	var callback = function(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			console.log(results.length);
		    for (var i = 0; i < results.length; i++) {
		      	var place = results[i];
		      	addMarker(place);
		      	Marker.push(place);
		      	console.log(place);		    
		    }
		}
	};

	var clearMarkers = function() {
        setMapOnAll(null);
    }

    function setMapOnAll(map) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
			console.log(results.length);
		    for (var i = 0; i < results.length; i++) {
		      	var place = results[i];
          		place.setMap(map);
			}
        }
    }

	function addMarker(place) {
	  	var marker = new google.maps.Marker({
		    map: $scope.map,
		    position: place.geometry.location,
		    icon: {
		      url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
		      anchor: new google.maps.Point(10, 10),
		      scaledSize: new google.maps.Size(10, 17)
	   	 	}
  		});

	  	google.maps.event.addListener(marker, 'click', function() {
		    service.getDetails(place, function(result, status) {
		      if (status !== google.maps.places.PlacesServiceStatus.OK) {
		        console.error(status);
		        return;
		      }
		      infoWindow.setContent(result.name);
		      infoWindow.open(map, marker);
		    });
  		});
	}

	
});