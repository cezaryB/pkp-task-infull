import * as mapboxgl from "mapbox-gl";
import { first, map } from "rxjs/operators";
import { of } from "rxjs";
import locationService from "./location.service";
import pointsService from "./points.service";
import userPointerService from "./user-pointer.service";
import lineService from "./line.service";

class MapboxService {
  async bootstrapMap() {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2lrb3JhMDAiLCJhIjoiY2swaHN3Z2duMDA1dTNlcDk3Y3p5cjNmNCJ9.5hTW49VqwphtDGMdE-SwEg";

    return of(locationService.getWarsawLocation())
      .pipe(
        first(),
        map(center => {
          const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: center,
            zoom: 15
          });
          map.on("load", async () => {
            pointsService.addPlacesToMap(map);
            lineService.addLine(map);
            await userPointerService.addUserPointerToMap(map);
          });
          return map;
        })
      )
      .toPromise();
  }

  // Add zoom and rotation controls to the map.
  addControls(map) {
    map.addControl(new mapboxgl.NavigationControl());
  }
}

export default new MapboxService();
