import React from 'react';
import { Alert, Text, View, Modal, ActivityIndicator } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Inventory, Timer } from './index';
import MapStyle from '../../assets/mapStyle';
import { styles } from '../../assets/styles';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
import geolib from 'geolib';
import { connect } from 'react-redux';
import { thunk_beganTimer, thunk_stoppedTimer } from '../store/timer';

//get within range of marker to be able to render AR
const inRange = 100;
const startTime = 40;

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
      initialRegion: {
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
  renderMap = (id) => {
    return (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapStyle}
          initialRegion={this.state.initialRegion}
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
                  this.props.navigation.navigate(`ARClue${marker.id}`);
                } else {
                  Alert.alert('Not close enough!')
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
                this.props.stopTimer(id)
                this.props.navigation.navigate('Lose')
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
          <Inventory
            onBackPackClose={this.onBackPackClose} />
        </Modal>
      </View>
    );
  }  

  renderLoading = () => (
    <View style={styles.loadingContainer}>
      <Text>Loading</Text>
      <ActivityIndicator size="large" />
    </View>
  );

  componentDidMount() {
    const randomDistance = Math.random() * (0.0002 - 0.0001) + 0.0001;
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          initialRegion: {
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
              // latitude: position.coords.latitude,
              // longitude: position.coords.longitude,
              latitude: randomDistance + 0.0004 + position.coords.latitude,
              longitude:
                position.coords.longitude +
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

  async componentDidUpdate(id) {
    if (!this.props.timeRemaining) {
      this.props.beginTimer(startTime);
    }
    if (this.props.timeRemaining === 0 && this.props.id !== 0) {
      if (this.state.BackPackVisible) {
        this.setState({
          BackPackVisible: false
        });
      }
      await this.props.stopTimer(id);
      this.props.navigation.navigate('Lose')
    }
    if (this.props.inventory.length === 3 && this.state.markers.length === 3) {
      Alert.alert('You have everything you need. Go disarm the bomb!')
      const lat = this.state.userLocation.latitude + 0.0003;
      const lon = this.state.userLocation.longitude + 0.0003;
      let bombMarker = [
        {
          latitude: lat,
          longitude: lon,
          id: 4
        }
      ];
      this.setState({
        markers: bombMarker
      });
    }
  }

  render() {
    const id = this.props.id;
    return this.state.initialRegion.latitude ? (
      <React.Fragment>
        {this.renderMap(id)}
      </React.Fragment>
    ) : (
        <React.Fragment>
          {this.renderLoading()}
        </React.Fragment>
      );
  }
}

const mapStateToProps = state => ({
  inventory: state.inventory.inventory,
  timeRemaining: state.timer.timeRemaining,
  id: state.timer.id
});

const mapDispatchToProps = dispatch => {
  return {
    beginTimer: (time) => dispatch(thunk_beganTimer(time)),
    stopTimer: id => dispatch(thunk_stoppedTimer(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
