const { easing, tween, keyframes, styler } = window.popmotion;

const divStyler1 = styler(document.getElementById("a1"));
const divStyler2 = styler(document.getElementById("a2"));
const divStyler3 = styler(document.getElementById("a3"));
const divStyler4 = styler(document.getElementById("a4"));
const divStyler5 = styler(document.getElementById("a5"));

// quiz elements
let q2 = document.getElementById("q2");
let a2 = document.getElementById("a2");

let q3 = document.getElementById("q3");
let a3 = document.getElementById("a3");

let q4 = document.getElementById("q4");
let a4 = document.getElementById("a4");

let q5 = document.getElementById("q5");
let a5 = document.getElementById("a5");

let res = document.getElementById("res");

// https://developers.google.com/maps/documentation/javascript/shapes
// https://developers.google.com/maps/documentation/javascript/examples/polygon-simple
// locations with boundaries:

// Oviatt Library-D4
const building1 = {
  north_boundary: 34.240418545235805,
  south_boundary: 34.2395011604273,
  west_boundary: -118.5300695622731,
  east_boundary: -118.52861374512882,
};

// Chaparral Hall-F3
// 34.23857462958639, -118.52728358966202
// 34.237893888897474, -118.52670155029158
const building2 = {
  north_boundary: 34.23857462958639,
  south_boundary: 34.237893888897474,
  west_boundary: -118.52728358966202,
  east_boundary: -118.52670155029158,
};
// Student Rec Center-G4
// 34.2406287249812, -118.52521651458189
// 34.23930964519572, -118.52464524343145
const building3 = {
  north_boundary: 34.2406287249812,
  south_boundary: 34.23930964519572,
  west_boundary: -118.52521651458189,
  east_boundary: -118.52464524343145,
};
// Jerome Richfield Hall-C3
// 34.239157024431684, -118.53165645373933
// 34.23867118442985, -118.5302381253658
const building4 = {
  north_boundary: 34.239157024431684,
  south_boundary: 34.23867118442985,
  west_boundary: -118.53165645373933,
  east_boundary: -118.5302381253658,
};
// assigned - Oasis Wellness Center—F4
// 34.23976002540265, -118.52600162665593
// 34.23946018739783, -118.52541663273509
const building5 = {
  north_boundary: 34.23976002540265,
  south_boundary: 34.23946018739783,
  west_boundary: -118.52600162665593,
  east_boundary: -118.52541663273509,
};

const customStyled = [
  {
    featureType: "all",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

function initMap() {
  let doubleClicks = 1;
  let score = 0;
  const [valid, invalid] = ["#00FF00", "#FF0000"];
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.239, lng: -118.528 },
    zoom: 16,
    draggable: false,
    scrollwheel: false,
    panControl: false,
    disableDefaultUI: true,
  });

  const isGameOver = (numClicks) => {
    if (numClicks == 6) {
      return true;
    } else {
      return false;
    }
  };

  const question1 = (lat, lng) => {
    if (
      lat <= building1.north_boundary &&
      lat >= building1.south_boundary &&
      lng <= building1.east_boundary &&
      lng >= building1.west_boundary
    ) {
      return true;
    } else {
      return false;
    }
  };

  const question2 = (lat, lng) => {
    if (
      lat <= building2.north_boundary &&
      lat >= building2.south_boundary &&
      lng <= building2.east_boundary &&
      lng >= building2.west_boundary
    ) {
      return true;
    } else {
      return false;
    }
  };

  const question3 = (lat, lng) => {
    if (
      lat <= building3.north_boundary &&
      lat >= building3.south_boundary &&
      lng <= building3.east_boundary &&
      lng >= building3.west_boundary
    ) {
      return true;
    } else {
      return false;
    }
  };

  const question4 = (lat, lng) => {
    if (
      lat <= building4.north_boundary &&
      lat >= building4.south_boundary &&
      lng <= building4.east_boundary &&
      lng >= building4.west_boundary
    ) {
      return true;
    } else {
      return false;
    }
  };

  const question5 = (lat, lng) => {
    if (
      lat <= building5.north_boundary &&
      lat >= building5.south_boundary &&
      lng <= building5.east_boundary &&
      lng >= building5.west_boundary
    ) {
      return true;
    } else {
      return false;
    }
  };
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event
  map.addListener("dblclick", (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    if (!isGameOver(doubleClicks)) {
      if (doubleClicks == 1) {
        let a1 = document.getElementById("a1");
        if (question1(lat, lng)) {
          new google.maps.Rectangle({
            strokeColor: valid,
            strokeOpacity: 1.0,
            strokeWeight: 3,
            fillColor: valid,
            fillOpacity: 0.6,
            map,
            bounds: {
              north: building1.north_boundary,
              south: building1.south_boundary,
              east: building1.east_boundary,
              west: building1.west_boundary,
            },
          });
          score++;
          a1.innerText = "Correct!";
        } else {
          tween({
            from: 0,
            to: { x: 2, y: 2, x: 1, y: 1, x: 2, y: 2 },
            duration: 20,
            ease: easing.easeOut,
            yoyo: 7,
          }).start(divStyler1.set);

          new google.maps.Rectangle({
            strokeColor: invalid,
            strokeOpacity: 1.0,
            strokeWeight: 3,
            fillColor: invalid,
            fillOpacity: 0.6,
            map,
            bounds: {
              north: building1.north_boundary,
              south: building1.south_boundary,
              east: building1.east_boundary,
              west: building1.west_boundary,
            },
          });
          a1.innerText = "Sorry, incorrect.";
        }
        doubleClicks++;
        q2.innerText = "2. Where is Chaparral Hall?";
        return;
      }
      if (doubleClicks == 2) {
        if (question2(lat, lng)) {
          new google.maps.Rectangle({
            strokeColor: valid,
            strokeOpacity: 1.0,
            strokeWeight: 3,
            fillColor: valid,
            fillOpacity: 0.6,
            map,
            bounds: {
              north: building2.north_boundary,
              south: building2.south_boundary,
              east: building2.east_boundary,
              west: building2.west_boundary,
            },
          });
          score++;
          a2.innerText = "Correct!";
        } else {
          tween({
            from: 0,
            to: { x: 2, y: 2, x: 1, y: 1, x: 2, y: 2 },
            duration: 20,
            ease: easing.easeOut,
            yoyo: 7,
          }).start(divStyler2.set);
          new google.maps.Rectangle({
            strokeColor: invalid,
            strokeOpacity: 1.0,
            strokeWeight: 3,
            fillColor: invalid,
            fillOpacity: 0.6,
            map,
            bounds: {
              north: building2.north_boundary,
              south: building2.south_boundary,
              east: building2.east_boundary,
              west: building2.west_boundary,
            },
          });
          a2.innerText = "Sorry, incorrect.";
        }
        doubleClicks++;
        q3.innerText = "3. Where is the SRC?";

        return;
      }
      if (doubleClicks == 3) {
        if (question3(lat, lng)) {
          new google.maps.Rectangle({
            strokeColor: valid,
            strokeOpacity: 1.0,
            strokeWeight: 3,
            fillColor: valid,
            fillOpacity: 0.6,
            map,
            bounds: {
              north: building3.north_boundary,
              south: building3.south_boundary,
              east: building3.east_boundary,
              west: building3.west_boundary,
            },
          });
          score++;
          a3.innerText = "Correct!";
        } else {
          tween({
            from: 0,
            to: { x: 2, y: 2, x: 1, y: 1, x: 2, y: 2 },
            duration: 20,
            ease: easing.easeOut,
            yoyo: 7,
          }).start(divStyler3.set);
          new google.maps.Rectangle({
            strokeColor: invalid,
            strokeOpacity: 1.0,
            strokeWeight: 3,
            fillColor: invalid,
            fillOpacity: 0.6,
            map,
            bounds: {
              north: building3.north_boundary,
              south: building3.south_boundary,
              east: building3.east_boundary,
              west: building3.west_boundary,
            },
          });
          a3.innerText = "Sorry, incorrect.";
        }
        doubleClicks++;
        q4.innerText = "4. Where is Jerome Richfield Hall?";
        return;
      }
      if (doubleClicks == 4) {
        if (question4(lat, lng)) {
          new google.maps.Rectangle({
            strokeColor: valid,
            strokeOpacity: 1.0,
            strokeWeight: 3,
            fillColor: valid,
            fillOpacity: 0.6,
            map,
            bounds: {
              north: building4.north_boundary,
              south: building4.south_boundary,
              east: building4.east_boundary,
              west: building4.west_boundary,
            },
          });
          score++;
          a4.innerText = "Correct!";
        } else {
          tween({
            from: 0,
            to: { x: 2, y: 2, x: 1, y: 1, x: 2, y: 2 },
            duration: 20,
            ease: easing.easeOut,
            yoyo: 7,
          }).start(divStyler4.set);
          new google.maps.Rectangle({
            strokeColor: invalid,
            strokeOpacity: 1.0,
            strokeWeight: 3,
            fillColor: invalid,
            fillOpacity: 0.6,
            map,
            bounds: {
              north: building4.north_boundary,
              south: building4.south_boundary,
              east: building4.east_boundary,
              west: building4.west_boundary,
            },
          });
          a4.innerText = "Sorry, incorrect.";
        }
        doubleClicks++;
        q5.innerText = "5. Where is the Oasis Wellness Center?";
        return;
      }
      if (doubleClicks == 5) {
        if (question5(lat, lng)) {
          new google.maps.Rectangle({
            strokeColor: valid,
            strokeOpacity: 1.0,
            strokeWeight: 3,
            fillColor: valid,
            fillOpacity: 0.6,
            map,
            bounds: {
              north: building5.north_boundary,
              south: building5.south_boundary,
              east: building5.east_boundary,
              west: building5.west_boundary,
            },
          });
          score++;
          a5.innerText = "Correct!";
        } else {
          tween({
            from: 0,
            to: { x: 2, y: 2, x: 1, y: 1, x: 2, y: 2 },
            duration: 20,
            ease: easing.easeOut,
            yoyo: 7,
          }).start(divStyler5.set);
          new google.maps.Rectangle({
            strokeColor: invalid,
            strokeOpacity: 1.0,
            strokeWeight: 3,
            fillColor: invalid,
            fillOpacity: 0.6,
            map,
            bounds: {
              north: building5.north_boundary,
              south: building5.south_boundary,
              east: building5.east_boundary,
              west: building5.west_boundary,
            },
          });
          a5.innerText = "Sorry, incorrect.";
        }
        doubleClicks++;
      }
    }
    res.innerText = `Your Score: ${score}/5`;
  });

  map.set("styles", customStyled);
}

window.initMap = initMap;
