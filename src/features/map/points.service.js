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
          features: data.points.map(point => {
            return {
              type: "Feature",
              properties: {
                description: `<strong>${point.name}</strong>
                <img src="${point.img}" />
                <p>${point.description}</p>`,
                icon: "theatre"
              },
              geometry: {
                type: "Point",
                coordinates: point.coordinates
              }
            };
          })
        }
      },
      layout: {
        "icon-image": "{icon}-15",
        "icon-allow-overlap": true
      }
    });

    this.handlePointerChanges(map);
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
