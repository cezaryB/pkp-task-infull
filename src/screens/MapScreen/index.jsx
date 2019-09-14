import React from "react";
import Map from "../../components/Map";
import Zip from "../../components/Zip";

const MapScreen = props => {
  const handleCurrentPosition = (value) => {
    console.log(value);
  }

  return (
    <div className="map-container">
      <Map />
      <Zip handleCurrentPosition={handleCurrentPosition} />
    </div>
  );
};

export default MapScreen;
