import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: 0,
        longitudeDelta: 0,
        error: null
      }
    };
    this.onRegionChange = this.onRegionChange.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
  }

  async componentDidMount() {
      await navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421,
            error: null,
          }
        });
      },
        (error) => this.setState({ error: error }),
        { enableHighAccuracy: true, timeout: 1000, maximumAge: 0 })
  }

  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    console.log('latitude', this.state.region.latitude)
    console.log('longitude', this.state.region.longitude)
    return (
      <View style={styles.container}>
        {this.state.region.latitude ? (
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation
        >
          {/* {this.state.markers.map(marker => (
            <Marker
              coordinate={marker.latlng}
              // title={marker.title}
              // description={marker.description}
            />
          ))} */}
        </MapView>
        ) : (
          <Text>
            Loading...
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
