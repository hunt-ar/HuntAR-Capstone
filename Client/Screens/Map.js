import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapStyle from '../assets/mapStyle';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        error: null
      },
      markers: [
        {
          latitude: 35.334835915305,
          longitude: -120.74445785104
        }
      ]
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.00001,
            longitudeDelta: 0.00001,
            error: null
          }
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 }
    );
  }

  render() {
    return this.state.region.latitude ? (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapStyle}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation
        >
          {this.state.markers.map(marker => (
            <Marker key={1} coordinate={marker} />
          ))}
        </MapView>
        <View flexDirection="row" padding={15} alignItems="center">
          <View style={styles.quitButtonContainer}>
            <AwesomeButton
              style={styles.quitButton}
              onPress={() => this.props.navigation.navigate('Home')}
              backgroundColor="#c64747"
              backgroundActive="#595757"
              springRelease={true}
              width={150}
            >
              Quit
            </AwesomeButton>
          </View>
          <View style={styles.solveButtonContainer}>
            <AwesomeButton
              style={styles.solveButton}
              onPress={() => this.props.navigation.navigate('Home')}
              backgroundColor="#459b57"
              backgroundActive="#595757"
              springRelease={true}
              width={150}
            >
              Solve
            </AwesomeButton>
          </View>
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  container: {
    flex: 1,
    fontSize: 200
  },
  quitButton: {
    bottom: 0,
    left: 0
  },
  solveButton: {
    bottom: 0,
    right: 0
  },
  solveButtonContainer: {
    right: 0
  },
  quitButtonContainer: {
    left: 0
  }
});
