import React from "react";
import MapboxService from "../../features/map/map.service";
import "./index.scss";

class Map extends React.Component {
  async componentDidMount() {
    const map = await MapboxService.bootstrapMap();
  }

  render() {
    return <div id="map" />;
  }
}

export default Map;
