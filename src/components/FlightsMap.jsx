import React, { useEffect, useState } from "react";

import { findUniqueAirports } from "../utils/objectHandler";
import { getETA } from "../utils/datesFormatter";
import {
  takeoffIcon,
  landingIcon,
  landingTakeoffIcon,
  airplaneIcon_1,
  airplaneIcon_2,
  airplaneIcon_3,
  airplaneIcon_4,
  selectAirplane,
  airportConect,
  airplaneRouteTrack,
  airplaneLandingIcon,
  airplaneTakeoffIcon,
  airplaneCrashedIcon,
  } from "../utils/leafletHelper";

import {
  MapContainer as Map,
  TileLayer as Layer,
  Popup,
  Marker,
  Polyline,
  } from 'react-leaflet';

import "leaflet-marker-rotation";

import 'leaflet/dist/leaflet.css';

export default function FlightsMap( props ) {
  const { flights, planes, planesRoutes, airplanesEvent } = props;
  const [uniqueAirports, setUniqueAirports] = useState([]);
  const airplanes = [
    airplaneIcon_1,
    airplaneIcon_2,
    airplaneIcon_3,
    airplaneIcon_4,
  ];
  const planeEvents = [
    airplaneTakeoffIcon,
    airplaneLandingIcon,
    airplaneCrashedIcon
  ];

  const eventTypes = {
    0: "take-off",
    1: "landing",
    2: "crashed",
  };

  useEffect(() => {
    setUniqueAirports(findUniqueAirports(flights));
  } , [flights]);

  useEffect(() => {
    ;
  }, [planes, airplanesEvent]);

  return (
    <div className="bg-secondary rounded-container padding-50 map-container">
      <h3>Seguimiento de vuelos 🌏</h3>
      <Map
        center={{lat: '0', lng: '8.52493815191621'}}
        zoom={2}
      >

        <Layer
          url="https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=f623d3730cf244a3aade4d3965e98794"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {uniqueAirports && Object.keys(uniqueAirports).map((key, idx) => (
          uniqueAirports[key].type === 'departure' ? (
            <Marker icon={takeoffIcon} key={idx} position={[uniqueAirports[key].location.lat, uniqueAirports[key].location.long]}>
              <Popup className="popup">
                <h5>{uniqueAirports[key].id}</h5>
                <h5>{uniqueAirports[key].name}</h5>
                <p>{uniqueAirports[key].city.name}, {uniqueAirports[key].city.country.name}
                </p>
              </Popup>
            </Marker>
              ) : uniqueAirports[key].type === 'destination' ? (
            <Marker icon={landingIcon} key={idx} position={[uniqueAirports[key].location.lat, uniqueAirports[key].location.long]}>
            <Popup className="popup">
                <h5>{uniqueAirports[key].id}</h5>
                <h5>{uniqueAirports[key].name}</h5>
                <p>{uniqueAirports[key].city.name}, {uniqueAirports[key].city.country.name}
                </p>
            </Popup>
          </Marker>
            ) : (
            <Marker icon={landingTakeoffIcon} key={idx} position={[uniqueAirports[key].location.lat, uniqueAirports[key].location.long]}>
              <Popup className="popup">
                  <h5>{uniqueAirports[key].id}</h5>
                  <h5>{uniqueAirports[key].name}</h5>
                  <p>{uniqueAirports[key].city.name}, {uniqueAirports[key].city.country.name}
                  </p>
              </Popup>
            </Marker>
            )
        ))}
        {flights && Object.keys(flights).map((key, idx) => (
          <Polyline pathOptions={airportConect} key={idx} positions={[
            [flights[key].departure.location.lat, flights[key].departure.location.long],
            [flights[key].destination.location.lat, flights[key].destination.location.long]
          ]} />
        ))}
        {planes && Object.keys(planes).map((key, idx) => (
          planes[key].status === 'flying' ? (
          <Marker
            icon={airplanes[selectAirplane(planes[key])]}
            key={idx}
            position={[planes[key].position.lat, planes[key].position.long]}>
            <Popup className="popup">
              <h5>{planes[key].flight_id}</h5>
              <p>{planes[key].airline.name}</p>
              <p>{planes[key].captain}</p>
              <p>{getETA(planes[key].ETA)}</p>
              <p>{planes[key].status}</p>
            </Popup>
          </Marker>
          ) : ( <></> )
        ))}
        {planesRoutes && Object.keys(planesRoutes).map((key, idx) => (
          <Polyline pathOptions={airplaneRouteTrack} key={idx} positions={
            planesRoutes[key].map((route) => ([route[0], route[1]]))}
          />
        ))}
        {airplanesEvent && Object.keys(airplanesEvent).map((key, idx) => (
          airplanesEvent[key] &&
          airplanesEvent[key].show &&
          airplanesEvent[key]?.plane?.position?.long ? (
          <Marker icon={planeEvents[airplanesEvent[key].type]} key={key} position={[airplanesEvent[key]?.plane?.position?.lat, airplanesEvent[key]?.plane?.position?.long]}>
            <Popup className="popup">
              <h5>{airplanesEvent[key].plane.flight_id}</h5>
              <p>{airplanesEvent[key].plane.airline.name}</p>
              <p>{eventTypes[airplanesEvent[key].type]}</p>
            </Popup>
          </Marker>
          ) : <></>
        ))}
      </Map>
    </div>
  );
}
