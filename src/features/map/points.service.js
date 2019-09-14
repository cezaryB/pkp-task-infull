import mapboxgl from "mapbox-gl";
import { data } from "../../data/data";
class PointsService {
  addPlacesToMap(map) {
    // Add a layer showing the places.
    map.addLayer({
      id: "places",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: data.points
        }
      },
      layout: {
        "icon-image": "{icon}-15",
        "icon-allow-overlap": true
      }
    });

    this.handlePointClick(map);
    this.handlePointerChanges(map);
  }

  calculatePopupPosition(e) {
    var coordinates = e.features[0].geometry.coordinates.slice();

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    return coordinates;
  }

  createPopup(coordinates, html, map) {
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(html)
      .addTo(map);
  }

  handlePointClick(map) {
    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on("click", "places", e => {
      const coordinates = this.calculatePopupPosition(e);
      const description = e.features[0].properties.description;

      this.createPopup(coordinates, description, map);
    });
  }

  handlePointerChanges(map) {
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on("mouseenter", "places", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "places", () => {
      map.getCanvas().style.cursor = "";
    });
  }
}

export default new PointsService();
