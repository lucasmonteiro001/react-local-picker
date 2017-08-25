const googleMapsAPIMock = {
  maps: {
    events: {},
    event: {
      trigger: (eventName, event) => {
        googleMapsAPIMock.maps.events[eventName](event)
      }
    },
    Map: jest.fn(function() {
      this.setCenter = jest.fn()
      this.addListener = (eventName, callback) => {
        googleMapsAPIMock.maps.events[eventName] = callback
      }
    }),
    LatLng: function(lat, lng) {
      return { lat, lng }
    },
    Marker: jest.fn(function() {
      this.setPosition = jest.fn()
    }),
    Geocoder: jest.fn(() => {
      return {
        geocode: (location, callback) => {
          const results = [
            { formatted_address: 'Belo Horizonte - MG' }
          ]

          callback(results)
        }
      }
    }),
    places: {
      Autocomplete: jest.fn(function() {
        this.addListener = (eventName, callback) => {
          googleMapsAPIMock.maps.events[eventName] = callback
        }
        this.getPlace = () => {
          return {
            geometry: {
              location: {
                lat: 5,
                lng: 5
              }
            }
          }
        }
      })
    }
  }
}

export default googleMapsAPIMock
