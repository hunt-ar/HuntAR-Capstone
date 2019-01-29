import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 35.33485,
        longitude: -120.74324,
        latitudeDelta: 0.000922,
        longitudeDelta: 0.000421
      }
    };
    this.onRegionChange = this.onRegionChange.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
  }

  componentDidMount() {}

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
    return (
      <View style={styles.container}>
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
