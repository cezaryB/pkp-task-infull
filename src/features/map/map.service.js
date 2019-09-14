import * as mapboxgl from "mapbox-gl";
import { first, map } from "rxjs/operators";
import { of } from "rxjs";
import pointsService from "./points.service";
import userPointerService from "./user-pointer.service";
import lineService from "./line.service";
import { data } from "../../data/data";

class MapboxService {
  async bootstrapMap() {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2lrb3JhMDAiLCJhIjoiY2swaHN3Z2duMDA1dTNlcDk3Y3p5cjNmNCJ9.5hTW49VqwphtDGMdE-SwEg";

    return of(data.locations.Warsaw)
      .pipe(
        first(),
        map(center => {
          const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: center,
            zoom: 9
          });
          map.on("load", async () => {
            pointsService.addPlacesToMap(map);
            lineService.addLines(map);
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
