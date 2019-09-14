import { Marker } from "mapbox-gl";
import { data } from '../../data/data';

const createMarker = function (src, name, cb) {
  const marker = document.createElement("img");
  marker.style.width = '30px';
  marker.style.height = '30px';
  marker.src = src;
  marker.classList.add('custom-marker-point');
  marker.id = name;
  marker.onclick = () => cb(name);

  return marker;
};

const applyMarkers = (map, icon, cb) => {
  data.points.forEach(point => {
    const customMarker = createMarker(icon, point.name, cb);
    new Marker({
      element: customMarker
    })
      .setLngLat([point.coordinates[1], point.coordinates[0]])
      .addTo(map)
  });
};

export default applyMarkers;