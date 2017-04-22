mapOfCCTV = {
    H1: { lat: 22.279248, lng: 114.171972 }
}

var boxes = [];

function drawBoxes() {
    for (var indexOfBoxes = 0; indexOfBoxes <= 3; indexOfBoxes++) {
        boxes[indexOfBoxes]=personalBox([], 15, indexOfBoxes);
    }
}

function personalBox(overview_path, box_number) {
    var box_size = Math.ceil(overview_path.length / box_number);
    var boxes_of_path = [];
    var j = 0;//current point 
    for (var i = 0; i <= box_number; i++) {
        boxes_of_path[i] = { large_lat: -180, small_lat: 180, large_lng: -180, small_lng: 180 };
        k = 0;
        while (k <= box_size) {
            if (j > overview_path.length) break;
            if (overview_path[j].lat > boxes_of_path[i].large_lat) boxes_of_path[i].large_lat = overview_path[j].lat;
            if (overview_path[j].lat < boxes_of_path[i].small_lat) boxes_of_path[i].small_lat = overview_path[j].lat;
            if (overview_path[j].lng > boxes_of_path[i].large_lng) boxes_of_path[i].large_lng = overview_path[j].lng;
            if (overview_path[j].lng > boxes_of_path[i].small_lng) boxes_of_path[i].small_lng = overview_path[j].lng;
        }
        if (j > overview_path.length) break;
        console.log(boxes_of_path[i])
        j += 1;
        k += 1;
    }
    return boxes;
}

function checkNearRoute(boxes, lat, lng) {
    var flag = false;
    for (var i = 0; i <= boxes.length; i++) {
        if (lat => boxes[i].small_lat && lat <= boxes[i].large_lat && lng >= boxes[i].small_lng && lng <= boxes[i].large_lng) flag = true;
    }
    return flag;
}