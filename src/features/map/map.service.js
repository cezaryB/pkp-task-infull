import * as mapboxgl from "mapbox-gl";
import { first, map } from "rxjs/operators";
import { of } from "rxjs";
import pointsService from "./points.service";
import userPointerService from "./user-pointer.service";
import lineService from "./line.service";
import { data } from "../../data/data";

class MapboxService {
  async bootstrapMap() {
    // You don't see this
    // ToDo need to be moved to env variables, because of lack of environments we kept it static.
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
            this.addCustomSkin(map);
            pointsService.addPlacesToMap(map);
            lineService.addLines(map);
            await userPointerService.addUserPointerToMap(map);
          });
          return map;
        })
      )
      .toPromise();
  }

  addCustomSkin(map) {
    var layers = map.getStyle().layers;
    // Find the index of the first symbol layer in the map style
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === "symbol") {
        firstSymbolId = layers[i].id;
        break;
      }
    }
    map.addSource("skin", {
      type: "image",
      url: "/map.png",
      coordinates: [
        [15.073222, 55.000303],
        [23.997329, 55.000303],
        [23.997329, 51.88732],
        [15.073222, 51.88732]
      ]
    });
    map.addLayer(
      {
        id: "radar-layer",
        type: "raster",
        source: "skin",
        paint: {
          "raster-fade-duration": 0
        }
      },
      firstSymbolId
    );
  }

  // Add zoom and rotation controls to the map.
  addControls(map) {
    map.addControl(new mapboxgl.NavigationControl());
  }
}

export default new MapboxService();
