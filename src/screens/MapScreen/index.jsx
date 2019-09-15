import React, { useState, useCallback } from "react";
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
  const [userPoints, setUserPoints] = useState(0);
  const maxQuizPoints = 9;

  const handleCurrentPosition = value => {
    const mapPoints = data.lines;
    setPointerPosition(mapPoints[value]);
  };

  const handleUpdatingPointerPosition = useCallback(markerName => {
    const currentSelectedMarker = data.points.find(
      point => point.name === markerName
    );

    setPointerPosition({
      latitude: currentSelectedMarker.coordinates[1],
      longitude: currentSelectedMarker.coordinates[0]
    });
  }, []);

  const renderPositiveFeedback = useCallback(() => {
    return (
      <div className="modal__success">
        <h3>Gratulujemy!</h3>
        <p>
          Odpowiedziałeś na ponad połowę pytań pozytywnie. Odblokowałeś zniżkę w
          Warsie:
        </p>
        <span className="modal__success-tag">15%</span>
      </div>
    );
  }, []);

  const renderNegativeFeedback = useCallback(() => {
    return (
      <div className="modal__failure">
        <h3>Graj dalej!</h3>
        <p>Ciągle brakuje Ci kilku punktów do odblokowania nagrody</p>
      </div>
    );
  }, []);

  return (
    <div className="map-container">
      <Navigation fixedPosition showProfile={() => setShowProfile(true)} />
      <Ticket />
      <Map
        pointerPosition={pointerPosition}
        updateUserPoints={setUserPoints}
        updatePosition={handleUpdatingPointerPosition}
      />
      <Zip handleCurrentPosition={handleCurrentPosition} />
      {showProfile && (
        <Modal closeModal={() => setShowProfile(false)}>
          <h1>Liczba punktów zdobytych w quizach:</h1>
          <h2>
            {userPoints} / {maxQuizPoints}
          </h2>
          <div className="modal__summary">
            {userPoints > Math.floor(maxQuizPoints / 2)
              ? renderPositiveFeedback()
              : renderNegativeFeedback()}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MapScreen;
