import { of } from "rxjs";
import { first } from "rxjs/operators";
import { data } from "../../data/data";

class UserPointerService {
  async addUserPointerToMap(map) {
    const pulsingDot = this.getPointer(map);
    map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });
    // ToDO change location
    of(data.locations.Warsaw)
      .pipe(first())
      .subscribe(coordinates => {
        map.addLayer({
          id: "user-pointer",
          type: "symbol",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: coordinates
                  }
                }
              ]
            }
          },
          layout: {
            "icon-image": "pulsing-dot"
          }
        });

        of(data.locations.Warsaw).subscribe(coordinates => {
          this.movePointer(map, coordinates);
        });
      });
  }

  getPointer(map) {
    const size = 200;

    return {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),

      onAdd: function() {
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext("2d");
      },

      render: function() {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        const context = this.context;

        // draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
          this.width / 2,
          this.height / 2,
          outerRadius,
          0,
          Math.PI * 2
        );
        context.fillStyle = "rgba(255, 200, 200," + (1 - t) + ")";
        context.fill();

        // draw inner circle
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 100, 100, 1)";
        context.strokeStyle = "white";
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // update this image's data with data from the canvas
        this.data = context.getImageData(0, 0, this.width, this.height).data;

        // keep the map repainting
        map.triggerRepaint();

        // return `true` to let the map know that the image was updated
        return true;
      }
    };
  }

  movePointer(map, coordinates) {
    map.getSource("user-pointer").setData({
      type: "Point",
      coordinates
    });
  }
}

export default new UserPointerService();
