import { Marker } from "mapbox-gl";
import { data } from '../../data/data';

const createMarker = function (src) {
  const marker = document.createElement("img");
  marker.style.width = '30px';
  marker.style.height = '30px';
  marker.src = src;
  marker.id = 'custom-marker-point';
  return marker;
};

const applyMarkers = (map, icon) => {
  data.points.forEach(point => {
    const customMarker = createMarker(icon);
    new Marker({
      element: customMarker
    })
      .setLngLat([point.coordinates[1], point.coordinates[0]])
      .addTo(map)

  });
};

export default applyMarkers;