import React from "react";
import Map from "../../components/Map";
import Zip from "../../components/Zip";

const MapScreen = props => {
  return (
    <div className="map-container">
      <Map />
      <Zip />
    </div>
  );
};

export default MapScreen;
