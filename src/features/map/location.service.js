import { Observable } from 'rxjs';

class LocationService {
  getMyLocation() {
      return Observable.create(observer => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.watchPosition(
          position => {
            observer.next([
              position.coords.longitude,
              position.coords.latitude
            ]);
          },
          error => observer.error(error)
        );
      } else {
        observer.error('Unsupported Browser');
      }
    });
  }

  getWarsawLocation() {
    return [21.0122, 52.2297]
  }
}

export default new LocationService()
 