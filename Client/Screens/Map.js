import React from 'react';
import {
  Alert,
  Image,
  Text,
  View,
  Modal,
} from 'react-native';
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
import { Audio } from 'expo'

//get within range of marker to be able to render AR
const inRange = 1000;
const startTime = 120;
const loadImage = require('../../assets/loading.gif');

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
      user: {}
    };
    this.onBackPackPress = this.onBackPackPress.bind(this);
    this.onBackPackClose = this.onBackPackClose.bind(this);
    this.setUserLocation.bind(this);
    this.distanceToMarker = this.distanceToMarker.bind(this);
  }

  playSound = async () => {
    const explodeSound = new Audio.Sound();
    try {
      await explodeSound.loadAsync(require('../../assets/sounds/explosion.mp3'));
      await explodeSound.playAsync();
    } catch (error) {
      console.error(error)
    }
  }

  handleQuit(id) {
    this.props.stopTimer(id);
    //explosion sound!
    this.playSound();
    //updates the game state to closed. User has quit game.

    db.collection('games')
      .where('users', 'array-contains', this.state.user.uid)
      .where('open', '==', true)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          db.collection('games').doc(doc.id).update({
            open: false,
            time: 0
          })
        })
      })
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
          {this.state.markers.map(marker => {
            return (
              <Marker
                key={marker.id}
                coordinate={marker}
                //height={100}
                //image={require('../../assets/instructionPics/placeholder.png')}
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
                    // this could be used to avoid alert race condition w/timer
                    // } else if (marker.id === 4) {
                    //   Alert.alert(`${marker.unlockedMessage}`);
                  } else {
                    Alert.alert(
                      `${marker.unlockedMessage}`,
                      null,
                      [
                        {
                          text: `View ${marker.name}`, onPress: () => {
                            this.props.navigation.navigate(`ARClue${marker.id}`);
                          }
                        }
                      ]
                    )
                  }
                }}
              />
            )
          }
          )}
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
      <Image style={styles.image} source={loadImage} />
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
              name: 'Shovel',
              latitude: 0.0002 + position.coords.latitude,
              longitude:
                Math.random() * (0.0004 - 0.0002) +
                0.0002 +
                position.coords.longitude,
              id: 1,
              unlockedMessage: 'You found a shovel.',
            },
            {
              name: 'Chest',
              latitude: 0.0003 + position.coords.latitude,
              longitude: position.coords.longitude - 0.0003,
              id: 2,
              unlock: 'Key',
              lockedMessage:
                "You found a chest! But its locked and you can't open it.",
              unlockedMessage:
                'You found a chest! Maybe the key you found will open it.',
            },
            {
              name: 'Key',
              latitude: position.coords.latitude - 0.0002,
              longitude: position.coords.longitude - 0.0002,
              // latitude: randomDistance + 0.0004 + position.coords.latitude,
              // longitude:
              //   position.coords.longitude +
              //   Math.random() * (0.0004 - 0.0002) +
              //   0.0002,
              id: 3,
              unlock: 'Shovel',
              lockedMessage: "Looks like something's buried here.",
              unlockedMessage:
                'You use the shovel to dig up a tarnished old key.',
            }
          ]
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 }
    );

    if (firebase.auth().currentUser) {
      this.setState({ user: firebase.auth().currentUser })
    }

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
      this.playSound();
      await this.props.resetTimer();
      this.props.navigation.navigate('Lose');

      //updates the game state to closed. User is a loser.
      db.collection('games')
        .where('users', 'array-contains', this.state.user.uid)
        .where('open', '==', true)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            db.collection('games').doc(doc.id).update({
              open: false,
              time: 0
            })
          })
        })
    }

    //Bomb renders because user has accessed all three clues
    if (this.props.inventory.length === 3 && this.state.markers.length === 3) {
      const lat = this.state.userLocation.latitude + 0.0003;
      const lon = this.state.userLocation.longitude + 0.0003;
      let bombMarker = [
        {
          name: 'Bomb',
          latitude: lat,
          longitude: lon,
          id: 4,
          unlockedMessage: 'You found the bomb! Do you remember the code to disarm it??',
          markerVisible: true
        }
      ];
      this.setState({
        markers: bombMarker,
        // markerVisible: true
      });

      //updates the game state for the bomb location
      db.collection('games')
        .where('users', 'array-contains', this.state.user.uid)
        .where('open', '==', true)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            db.collection('games').doc(doc.id).update({
              bomb: bombMarker
            })
          })
        })
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
