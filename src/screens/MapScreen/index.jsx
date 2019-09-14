import React from "react";
import Map from "../../components/Map";
import Zip from "../../components/Zip";

// Points on map data
import { data } from "../../data/data";

const MapScreen = props => {
  const [pointerPosition, setPointerPosition] = React.useState(data.lines[0]);

  const handleCurrentPosition = value => {
    const mapPoints = data.lines;

    setPointerPosition(mapPoints[value]);
  };

  return (
    <div className="map-container">
      <Map pointerPosition={pointerPosition} />
      <Zip handleCurrentPosition={handleCurrentPosition} />
    </div>
  );
};

export default MapScreen;