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
import {
  thunk_beganTimer,
  thunk_stoppedTimer,
  thunk_resetTimer
} from "../store/timer";
import firebase from 'firebase'
import { db } from "../store";

//get within range of marker to be able to render AR
const inRange = 100;
const startTime = 60;

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
      markers: [],
      user: firebase.auth().currentUser
    };
    this.onBackPackPress = this.onBackPackPress.bind(this);
    this.onBackPackClose = this.onBackPackClose.bind(this);
    this.setUserLocation.bind(this);
    this.distanceToMarker = this.distanceToMarker.bind(this);
  }

  handleQuit(id) {
    this.props.stopTimer(id);

    //updates the game state to closed. User has quit game.
    if (this.state.uid){
      db.collection('games')
        .where('users', 'array-contains', this.state.uid)
        .where('open', '==', true)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            db.collection('games').doc(doc.id).update({
              open: false,
              time: 0
            })
          })
        })
    } 

    this.props.navigation.navigate("Lose");
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
  renderMap = id => {
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
              //image={require('../../assets/location.png')}
              onPress={() => {
                const clueUnlocked = this.props.inventory.find(
                  item => item.name === `${marker.unlock}`
                );
                if (
                  this.distanceToMarker(this.state.userLocation, {
                    latitude: marker.latitude,
                    longitude: marker.longitude
                  }) > inRange
                ) {
                  Alert.alert('Not close enough!');
                } else if (
                  marker.id !== 1 &&
                  marker.id !== 4 &&
                  !clueUnlocked
                ) {
                  Alert.alert(`${marker.lockedMessage}`);
                } else {
                  Alert.alert(`${marker.unlockedMessage}`)
                  this.props.navigation.navigate(`ARClue${marker.id}`);
                }
              }}
            />
          ))}
        </MapView>
        <View justifyContent="space-between" flexDirection="row" padding={1}>
          <View marginLeft={5} style={styles.quitButtonContainer}>
            <AwesomeButton
              style={styles.quitButton}
              onPress={() => this.handleQuit(id)}
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
              color="#333333"
            />
          </View>
        </View>
        <Modal visible={this.state.BackPackVisible} animationType="slide">
          <Inventory onBackPackClose={this.onBackPackClose} />
        </Modal>
      </View>
    );
  };

  renderLoading = () => (
    <View style={styles.loadingContainer}>
      <Text>Fetching Clues...</Text>
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
              id: 1,
              unlockedMessage: 'You found a shovel.'
            },
            {
              latitude: randomDistance + 0.0002 + position.coords.latitude,
              longitude:
                Math.random() * (0.0004 - 0.0002) +
                0.0002 +
                position.coords.longitude,
              id: 2,
              unlock: 'Key',
              lockedMessage: 'You found a chest! But it\s locked and you can\'t open it.',
              unlockedMessage: 'You open the chest! Inside is a crumpled up note with a message scribbled on it. Looks like a code.'
            },
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              // latitude: randomDistance + 0.0004 + position.coords.latitude,
              // longitude:
              //   position.coords.longitude +
              //   Math.random() * (0.0004 - 0.0002) +
              //   0.0002,
              id: 3,
              unlock: 'Shovel',
              lockedMessage: 'Looks like something\'s buried here.',
              unlockedMessage: 'You use the shovel to dig up a tarnished old key.'
            }
          ]
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 }
    );
    if (!this.props.timeRemaining) {
      this.props.beginTimer(startTime);
    }
  }
  

  async componentDidUpdate(id) {
 
    //Time has gone to zero. User loses and is directed to the lose screen.
    if (this.props.timeRemaining === 0 && this.props.id !== 0) {
      if (this.state.BackPackVisible) {
        this.setState({
          BackPackVisible: false
        });
      }
      await this.props.stopTimer(id);
      await this.props.resetTimer();
      this.props.navigation.navigate("Lose");

    //updates the game state to closed. User is a loser.
    if (this.state.uid){
      db.collection('games')
      .where('users', 'array-contains', this.state.uid)
      .where('open', '==', true)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          db.collection('games').doc(doc.id).update({
            open: false,
            time: 0
          })
        })
      })
    }
    }

    //Bomb renders because user has accessed all three clues
    if (this.props.inventory.length === 3 && this.state.markers.length === 3) {
      const lat = this.state.userLocation.latitude + 0.0003;
      const lon = this.state.userLocation.longitude + 0.0003;
      let bombMarker = [
        {
          latitude: lat,
          longitude: lon,
          id: 4,
          unlockedMessage: 'You found the bomb!'
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
      <React.Fragment>{this.renderMap(id)}</React.Fragment>
    ) : (
      <React.Fragment>{this.renderLoading()}</React.Fragment>
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
    beginTimer: time => dispatch(thunk_beganTimer(time)),
    stopTimer: id => dispatch(thunk_stoppedTimer(id)),
    resetTimer: () => dispatch(thunk_resetTimer())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
