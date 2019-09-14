import { data } from "../../data/data";

class LineService {
  addLines(map) {
    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: data.lines.map(line => [
              line.latitude,
              line.longitude
            ])
          }
        }
      },
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#888",
        "line-width": 8
      }
    });
  }
}

export default new LineService();
