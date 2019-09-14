import React, { useCallback, useState, useMemo } from 'react';
import { data } from '../../data/data';
import Button from '@material-ui/core/Button';
import './index.scss';

const Modal = ({ markerSelected, closeModal, children }) => {
  const [showMore, setShowMore] = useState(false);

  const currentMarkerData = useMemo(() => {
    if (markerSelected) {
      return data.points.find(point => point.name === markerSelected)
    }
  }, [markerSelected])

  const renderChildren = useCallback(() => {
    return (
      <div className='modal__content'>
        {children}
        <Button
          variant='contained'
          onClick={closeModal}
        >
          Zamknij
        </Button>
      </div>
    );
  }, [children])

  const renderMarkersInfo = useCallback(() => {
    return (
      <React.Fragment>
        <h2>{currentMarkerData.name}</h2>
        <img className='modal__image' alt='markerSelected' src={`${currentMarkerData.img}.jpg`} />
        {showMore &&
          <p className='modal__description'>
            {currentMarkerData.description}
          </p>
        }
        <div className='modal__controls'>
          <Button variant="contained" style={{ backgroundColor: '#ff9966', color: 'white' }}>
            Quiz
          </Button>
          <Button
            variant='contained'
            style={{ backgroundColor: '#263761', color: 'white' }}
            onClick={() => setShowMore(true)}
            disabled={showMore}
          >
            Więcej
          </Button>
          <Button
            variant='contained'
            onClick={closeModal}
          >
            Zamknij
          </Button>
        </div>
      </React.Fragment>
    )
  }, [markerSelected, showMore, currentMarkerData])

  return (
    <div className='modal'>
      {
        markerSelected ?
          renderMarkersInfo() :
          renderChildren()
      }
    </div>
  );
};

export default Modal;