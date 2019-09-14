import React, { useState } from "react";
import Map from "../../components/Map";
import Zip from "../../components/Zip";
import Navigation from "../../components/Navigation";

// Points on map data
import { data } from "../../data/data";
import Ticket from "../../components/Ticket";

const MapScreen = props => {
  const [pointerPosition, setPointerPosition] = useState(data.lines[0]);

  const handleCurrentPosition = value => {
    const mapPoints = data.lines;
    setPointerPosition(mapPoints[value]);
  };

  return (
    <div className="map-container">
      <Navigation fixedPosition />
      <Ticket></Ticket>
      <Map pointerPosition={pointerPosition} />
      <Zip handleCurrentPosition={handleCurrentPosition} />
    </div>
  );
};

export default MapScreen;
