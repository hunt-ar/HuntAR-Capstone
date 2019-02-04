import React from 'react';
import { Text, View, Modal, ActivityIndicator } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Inventory } from './index';
import { Timer } from './index';
import MapStyle from '../../assets/mapStyle';
import { styles } from '../../assets/styles';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
import geolib from 'geolib';
import { connect } from 'react-redux';
import { thunk_stoppedTimer } from '../store/timer';

//get within range of marker to be able to render AR
const inRange = 30;

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      userLocation: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004
      },
      BackPackVisible: false,
      region: {
        latitude: 0,
        longitude: 0,
        error: null
      },
      markers: []
    };
    this.onBackPackPress = this.onBackPackPress.bind(this);
    this.onBackPackClose = this.onBackPackClose.bind(this);
    this.setUserLocation.bind(this);
    this.distanceToMarker = this.distanceToMarker.bind(this);
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
  setUserLocation(coordinate) {
    this.setState({
      userLocation: {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004
      }
    });
  }
  distanceToMarker(coordinate, marker) {
    if (coordinate && marker) {
      return geolib.getDistance(coordinate, marker, 1);
    } else {
      return Infinity;
    }
  }

  componentDidMount() {
    const randomDistance = Math.random() * (0.0002 - 0.0001) + 0.0001;
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
            error: null
          },
          markers: [
            {
              latitude: randomDistance + position.coords.latitude,
              longitude:
                Math.random() * (0.0004 - 0.0002) +
                0.0002 +
                position.coords.longitude,
              id: 1
            },
            {
              latitude: randomDistance + 0.0002 + position.coords.latitude,
              longitude:
                Math.random() * (0.0004 - 0.0002) +
                0.0002 +
                position.coords.longitude,
              id: 2
            },
            {
              latitude: randomDistance + 0.0004 + position.coords.latitude,
              longitude:
                position.coords.longitude -
                Math.random() * (0.0004 - 0.0002) +
                0.0002,
              id: 3
            }
          ]
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 }
    );
  }

  render() {
    const id = this.props.id;
    // console.log(
    //   'dist',
    //   this.distanceToMarker(this.state.userLocation, this.state.markers[0])
    // );
    return this.state.region.latitude ? (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapStyle}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation
          onUserLocationChange={locationChangedResult =>
            this.setUserLocation(locationChangedResult.nativeEvent.coordinate)
          }
        >
          <Timer />
          {this.state.markers.map(marker => (
            <Marker
              key={marker.id}
              coordinate={marker}
              onPress={() => {
                if (
                  this.distanceToMarker(this.state.userLocation, {
                    latitude: marker.latitude,
                    longitude: marker.longitude
                  }) < inRange
                ) {
                  console.log('within range!');
                  this.props.navigation.navigate(`ARClue${marker.id}`);
                } else {
                  console.log('not within range!');
                }
              }}
            />
          ))}
        </MapView>
        <View flexDirection="row" padding={15}>
          <View style={styles.quitButtonContainer}>
            <AwesomeButton
              style={styles.quitButton}
              onPress={() => {
                this.props.stopTimer(id);
                this.props.navigation.navigate('Lose');
              }}
              backgroundColor="#c64747"
              backgroundActive="#595757"
              springRelease={true}
              width={150}
            >
              Quit
            </AwesomeButton>
          </View>
          <View style={styles.backPackContainer}>
            <Icon.Button
              name="briefcase"
              style={styles.backPackButton}
              onPress={this.onBackPackPress}
              backgroundColor="transparent"
              size={50}
            />
          </View>
        </View>
        <Modal visible={this.state.BackPackVisible} animationType="slide">
          <Inventory onBackPackClose={this.onBackPackClose} />
        </Modal>
      </View>
    ) : (
      <View style={styles.loadingContainer}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  timeRemaining: state.timer.timeRemaining,
  id: state.timer.id
});

const mapDispatchToProps = dispatch => {
  return {
    stopTimer: id => dispatch(thunk_stoppedTimer(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
