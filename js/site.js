
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCI-mozmj5uMSflm_-u4e-HukQqtw0EUXk",
  authDomain: "hackust-47648.firebaseapp.com",
  databaseURL: "https://hackust-47648.firebaseio.com",
  projectId: "hackust-47648",
  storageBucket: "hackust-47648.appspot.com",
  messagingSenderId: "276444767952"
};

firebase.initializeApp(config);

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}