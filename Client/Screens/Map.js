import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Inventory } from './index';
import MapStyle from '../../assets/mapStyle';

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      BackPackVisible: false,
      region: {
        latitude: 0,
        longitude: 0,
        error: null
      },
      markers: [
        {
          latitude: 35.334835915305,
          longitude: -120.74475785104,
          id: 1,
          title: 'Clue 1'
        },
        {
          latitude: 35.334235915305,
          longitude: -120.74445785104,
          id: 2,
          title: 'Clue 2'
        },
        {
          latitude: 35.334535915305,
          longitude: -120.74445785104,
          id: 3,
          title: 'Clue 3'
        }
      ]
    };
    this.onBackPackPress = this.onBackPackPress.bind(this);
    this.onBackPackClose = this.onBackPackClose.bind(this);
  }

  onBackPackPress() {
    this.setState({
      BackPackVisible: true
    });
  }
  onBackPackClose() {
    this.setState({
      BackPackVisible: false
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
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
            <Marker title={marker.title} key={marker.id} coordinate={marker} />
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
              onPress={this.onBackPackPress}
              backgroundColor="#459b57"
              backgroundActive="#595757"
              springRelease={true}
              width={150}
            >
              BackPack
            </AwesomeButton>
          </View>
        </View>
        <Modal visible={this.state.BackPackVisible} animationType="slide">
          <Inventory onBackPackClose={this.onBackPackClose} />
        </Modal>
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
