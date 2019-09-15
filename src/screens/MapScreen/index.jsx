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
<<<<<<< HEAD
  const [userPoints, setUserPoints] = useState(0)
  const maxQuizPoints = 9;
=======
  const [userPoints, setUserPoints] = useState(0);
>>>>>>> animations

  const handleCurrentPosition = value => {
    const mapPoints = data.lines;
    const oldPoint = pointerPosition;
    const destination = mapPoints[value];
    let i = 0;
    const oldPointIndex = mapPoints.findIndex(
      el =>
        oldPoint.latitude === el.latitude && oldPoint.longitude === el.longitude
    );

    const stops = mapPoints.slice(oldPointIndex, value - oldPointIndex);
    for(let d = 0; d < stops.length - 1; d++) {
      const stop = stops[d];
      const nextStop = stops[d+1];
      let next = stop;

      do {
        next = nextPoint(next, nextStop);
        setTimeout(next => setPointerPosition(next), i * 250, next);
        i++;
      } while (next !== nextStop);
    };
  };

  const nextPoint = (current, destination) => {
    const speed_per_tick = 0.0005;
    const delta = {};
    let result = {};
    delta.latitude = destination.latitude - current.latitude;
    delta.longitude = destination.longitude - current.longitude;
    const destinationDistance = Math.sqrt(
      delta.latitude * delta.latitude + delta.longitude * delta.longitude
    );
    if (destinationDistance > speed_per_tick) {
      const ratio = speed_per_tick / destinationDistance;
      const latitude_move = ratio * delta.latitude;
      const longitude_move = ratio * delta.longitude;
      result.latitude = latitude_move + current.latitude;
      result.longitude = longitude_move + current.longitude;
    } else {
      result = destination;
    }

    return result;
  };

  const handleUpdatingPointerPosition = useCallback((markerName) => {
    const currentSelectedMarker = data.points.find(point => point.name === markerName);

    setPointerPosition({
      latitude: currentSelectedMarker.coordinates[1],
      longitude: currentSelectedMarker.coordinates[0],
    });
  }, [])

  const renderPositiveFeedback = useCallback(() => {
    return (
      <div className='modal__success'>
        <h3>Gratulujemy!</h3>
        <p>
          Odpowiedziałeś na ponad połowę pytań pozytywnie.
          Odblokowałeś zniżkę w Warsie:
        </p>
        <span className='modal__success-tag'>15%</span>
      </div>
    );
  }, [userPoints])


  const renderNegativeFeedback = useCallback(() => {
    return (
      <div className='modal__failure'>
        <h3>Graj dalej!</h3>
        <p>
          Ciągle brakuje Ci kilku punktów do odblokowania nagrody
        </p>
      </div>
    );
  }, [userPoints])

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
<<<<<<< HEAD
          <h1>
            Liczba punktów zdobytych w quizach:
          </h1>
          <h2>
            {userPoints} / {maxQuizPoints}
          </h2>
          <div className='modal__summary'>
            {
              userPoints > Math.floor(maxQuizPoints / 2) ?
                renderPositiveFeedback() :
                renderNegativeFeedback()
            }
          </div>
=======
          <h1>Liczba punktów zdobytych w quizach: {userPoints}</h1>
>>>>>>> animations
        </Modal>
      )}
    </div>
  );
};

export default MapScreen;
