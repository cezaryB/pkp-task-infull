import React from "react";
import MapboxService from "../../features/map/map.service";
import "./index.scss";

import UserPointerService from "../../features/map/user-pointer.service";

let map;

class Map extends React.Component {
  async componentDidMount() {
    map = await MapboxService.bootstrapMap();
  }

  componentDidUpdate() {
    const newCoords = [
      this.props.pointerPosition.latitude,
      this.props.pointerPosition.longitude
    ];
    return UserPointerService.movePointer(map, newCoords);
  }

  render() {
    return <div id="map" />;
  }
}

export default Map;
