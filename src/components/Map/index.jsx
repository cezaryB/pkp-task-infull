import React from "react";
import MapboxService from "../../features/map/map.service";
import "./index.scss";

import UserPointerService from "../../features/map/user-pointer.service";
import PointsService from "../../features/map/points.service";

let map;

class Map extends React.Component {
  async componentDidMount() {
    map = await MapboxService.bootstrapMap();
  }

  handleDisplayPopup = coords => {
    // PointsService.closePopup();
    const { name, desc } = this.props.pointerPosition;
    const htmlMarkup = `<div>${name}</div><div>${desc}</div>`;
    PointsService.createPopup(coords, htmlMarkup, map);
  };

  moveMap = newCoords => {
    UserPointerService.movePointer(map, newCoords);
    map.setCenter(newCoords);
    this.props.pointerPosition.name && this.handleDisplayPopup(newCoords);
  };

  componentDidUpdate() {
    const newCoords = [
      this.props.pointerPosition.latitude,
      this.props.pointerPosition.longitude
    ];
    return this.moveMap(newCoords);
  }

  render() {
    return <div id="map" />;
  }
}

export default Map;
