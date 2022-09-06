import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {sendConectionMessage} from '../utils/WebSocket';

import Chat from '../components/Chat';
import FlightsMap from '../components/FlightsMap';
import FlightsTable from '../components/FlightsTable';

const client = new W3CWebSocket("wss://tarea-1.2022-2.tallerdeintegracion.cl/connect");

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [flights, setFlights] = useState([]);
  const [planes, setPlanes] = useState({});
  const [planesRoutes, setPlanesRoutes] = useState({});
  const [airplanesEvent, setAirplaneEvent] = useState({});

  const eventTypes = {
    "take-off": 0,
    "landing": 1,
    "crashed": 2,
  };

  useEffect(() => {
    Object.keys(airplanesEvent).forEach(
      key => airplanesEvent[key] === undefined && delete airplanesEvent[key]
    );
  }, [airplanesEvent]);

  const addMessage = (messageArr) => {
    setMessages(messages => [...messages, messageArr]);
  }

  const addPlaneRoutes = (planeId, route) => {
    let newPlanesRoutes = planesRoutes;
    newPlanesRoutes[planeId] ? newPlanesRoutes[planeId].push(route) : newPlanesRoutes[planeId] = [route];
    setPlanesRoutes(newPlanesRoutes);
  }

  const addPlane = (plane) => {
    addPlaneRoutes(plane.flight_id, [plane.position.lat, plane.position.long]);
    let newPlanes = planes;
    newPlanes[plane.flight_id] = plane;
    setPlanes(newPlanes);
  }

  const addPlaneEvent = (plane, type) => {
    if (!plane) return;
    let newAirplanesEvent = airplanesEvent;
    const body = {
      plane: plane,
      type: type,
      show: true,
    }
    newAirplanesEvent[plane.flight_id] = body;
    setAirplaneEvent(newAirplanesEvent);
  }

  const hideAirplaneEvent = (planeId) => {
    let newAirplanesEvent = airplanesEvent;
    if (newAirplanesEvent[planeId]) newAirplanesEvent[planeId].show = false;
    setAirplaneEvent(newAirplanesEvent);
    setTimeout(deleteAirplaneEvent, 3000, planeId);
  }

  const deleteAirplaneEvent = (planeId) => {
    let newPlanes = planes;
    delete newPlanes[planeId];
    setPlanes(newPlanes);
    let newAirplanesEvent = airplanesEvent;
    delete newAirplanesEvent[planeId];
    setAirplaneEvent(newAirplanesEvent);
  }

  const airplaneEventHandler = (type, id) => {
    let plane = {...planes[id]};
    if (!plane) return;
    addPlaneEvent(plane, eventTypes[type]);
    setPlanes(({[id]: value, ...newPlanes}) => newPlanes);
    if (type === "crashed") {
      setTimeout(hideAirplaneEvent, 30000, id);
    } else {
      setTimeout(hideAirplaneEvent, 10000, id);
    }
  }

  useEffect(() => {
  // Conection WebSocket
  client.onopen = () => {
    sendConectionMessage(client);
    console.log("WebSocket Client Connected");
  }

  // Recive Server messages
  client.onmessage = (message) => {
    const data = JSON.parse(message.data);
    if (data.type === "message" && data.message.name !== process.env.REACT_APP_WEBSOCKET_USERNAME) {
      addMessage([data.message, "received"]);
    } else if (data.type === "flights") {
      setFlights(data.flights);
    } else if (data.type === "plane") {
      addPlane(data.plane);
    } else if (data.type === "take-off" || data.type === "landing" || data.type === "crashed") {
      airplaneEventHandler(data.type, data.flight_id);
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-primary-100">
      <div className='padding-100 upper-container'>
        <FlightsMap
          flights={flights}
          planes={planes}
          planesRoutes={planesRoutes}
          airplanesEvent={airplanesEvent}
          />
        <Chat
          client={client}
          addMessage={addMessage}
          messages={messages}
          />
      </div>
      <div className='center'>
      <FlightsTable
        flights={flights}
        planes={planes}
        />
      </div>
    </div>
  );
}
