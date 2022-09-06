import React, { useEffect, useState } from "react";

import { getDateTime, addedETA } from "../utils/datesFormatter";
import { objectSort } from "../utils/objectHandler";


// ID Flight, airline, origin, destination, departure time, arrival date, arrival time
export default function FlightsTable(props) {
  const { flights, planes } = props;
  const [sortedFlights, setSortedFlights] = useState([]);

  useEffect(() => {
    setSortedFlights(objectSort(flights, "departure", "destination"));
  }, [flights, planes]);

  return (
    <div className="table-div">
      <table className="styled-table">
        <thead>
            <tr>
                <th>Vuelo</th>
                <th>Aerolinea</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Hora de partida</th>
                <th>ETA</th>
            </tr>
        </thead>
        <tbody>
            {sortedFlights && Object.keys(sortedFlights).map((key, idx) => (
              <tr key={key}>
                <td>{sortedFlights[key].id}</td>
                <td>
                  {planes[sortedFlights[key].id] ? (
                    planes[sortedFlights[key].id].airline.id
                  ) : (
                    '-'
                  )}
                </td>
                <td>{sortedFlights[key].departure.id}</td>
                <td>{sortedFlights[key].destination.id}</td>
                <td>{getDateTime(sortedFlights[key].departure_date)}</td>
                <td>
                  {planes[sortedFlights[key].id] ? (
                    addedETA(sortedFlights[key].departure_date, planes[sortedFlights[key].id].ETA)
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}