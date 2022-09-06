import L from 'leaflet';

const takeoffIcon = new L.Icon({
  iconUrl: require('../img/takeoffnew.png'),
  iconSize: [40, 30],
});

const landingIcon = new L.Icon({
  iconUrl: require('../img/landing_new.png'),
  iconSize: [40, 30],
});

const landingTakeoffIcon = new L.Icon({
  iconUrl: require('../img/bothnew.png'),
  iconSize: [50, 30],
});

const airplaneIcon = new L.Icon({
  iconUrl: require('../img/airplane.png'),
  iconSize: [40, 40],
});

const airplaneIcon_1 = new L.Icon({
  iconUrl: require('../img/a1.png'),
  iconSize: [40, 40],
});

const airplaneIcon_2 = new L.Icon({
  iconUrl: require('../img/a2.png'),
  iconSize: [40, 40],
});

const airplaneIcon_3 = new L.Icon({
  iconUrl: require('../img/a3.png'),
  iconSize: [40, 40],
});

const airplaneIcon_4 = new L.Icon({
  iconUrl: require('../img/a4.png'),
  iconSize: [40, 40],
});

const airportConect = {
  color: 'blue',
  weight: 3,
  opacity: 0.1,
}

const airplaneRouteTrack = {
  color: 'green',
  weight: 5,
  opacity: 0.1,
}

const airplaneLandingIcon = new L.Icon({
  iconUrl: require('../img/airplane_landing.png'),
  iconSize: [20, 20],
  iconAnchor: [20, -20],
});

const airplaneTakeoffIcon = new L.Icon({
  iconUrl: require('../img/airplane_take-off.png'),
  iconSize: [20, 20],
  iconAnchor: [-20, 20],
});

const airplaneCrashedIcon = new L.Icon({
  iconUrl: require('../img/airplane_crashed.png'),
  iconSize: [30, 35],
});

const selectAirplane = (plane) => {
  const y = plane.position.lat;
  const x = plane.position.long;
  const hy = plane.heading.lat;
  const hx = plane.heading.long;
  if (hx >= x && hy >= y) {
    return 0;
  } else if (hx <= x && hy >= y) {
    return 1;
  } else if (hx <= x && hy <= y) {
    return 2;
  } else if (hx >= x && hy <= y) {
    return 3;
  }
};

export { takeoffIcon,
  landingIcon,
  landingTakeoffIcon,
  airplaneIcon,
  airplaneIcon_1,
  airplaneIcon_2,
  airplaneIcon_3,
  airplaneIcon_4,
  airportConect,
  airplaneRouteTrack,
  airplaneLandingIcon,
  airplaneTakeoffIcon,
  airplaneCrashedIcon,
  selectAirplane };