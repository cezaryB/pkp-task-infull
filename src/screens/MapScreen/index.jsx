import React, { useState, useEffect } from "react";
import Map from "../../components/Map";
import Zip from "../../components/Zip";
import Navigation from "../../components/Navigation";
import Modal from "../../components/Modal";

// Points on map data
import { data } from "../../data/data";
import Ticket from "../../components/Ticket";

const MapScreen = () => {
  const [pointerPosition, setPointerPosition] = useState(data.lines[0]);
  const [showProfile, setShowProfile] = useState(false);
  const [userPoints, setUserPoints] = useState(0)

  const handleCurrentPosition = value => {
    const mapPoints = data.lines;
    setPointerPosition(mapPoints[value]);
  };

  return (
    <div className="map-container">
      <Navigation fixedPosition showProfile={() => setShowProfile(true)} />
      <Ticket />
      <Map pointerPosition={pointerPosition} updateUserPoints={setUserPoints} />
      <Zip handleCurrentPosition={handleCurrentPosition} />
      {
        showProfile
        &&
        <Modal closeModal={() => setShowProfile(false)}>
          <h1>
            Liczba punktów zdobytych w quizach: {userPoints}
          </h1>
        </Modal>
      }
    </div>
  );
};

export default MapScreen;
