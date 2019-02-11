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
import Inventory from './Inventory';
import Timer from './Timer';
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
import { db } from '../store';
import { Audio } from 'expo'

//get within range of marker to be able to render AR
const inRange = 15;
const startTime = 250;
const loadImage = require('../../assets/loading.gif');
const bufferDistance = 18;

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
    const finalTime = this.props.timeRemaining
    db.collection('games')
      .where('users', 'array-contains', this.state.user.uid)
      .where('open', '==', true)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          db.collection('games').doc(doc.id).update({
            open: false,
            time: finalTime,
            win: false
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
                  } else {
                    Alert.alert(
                      `${marker.unlockedMessage}`,
                      null,
                      [
                        {
                          text: `View ${marker.name}`, onPress: () => {
                            this.props.navigation.navigate(`ARClue${marker.id}`);
                            this.state.markers.shift()
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

  async componentDidMount() {
    const randomDistance = Math.random() * (0.0002 - 0.0001) + 0.0001;
    navigator.geolocation.getCurrentPosition(
      position => {
        let initialRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
          error: null
        }

        this.setState({
          initialRegion,
        })

      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 }
    );

    if (!this.props.timeRemaining) {
      this.props.beginTimer(startTime);
    }

    db.collection('games').where('users', 'array-contains', this.state.user.uid).where('open', '==', true).get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        this.setState({
          markers: doc.data().markers
        });
      })
    })

  }

  async componentDidUpdate(id) {
    //Time has gone to zero. User loses and is directed to the lose screen.
    if (this.state.markers.length === 0 && this.props.inventory.length === 0) {
      navigator.geolocation.getCurrentPosition(
        position => {
          let markers = [
            {
              name: 'Shovel',
              latitude:
                Math.random() * (0.0002) - 0.0001 + position.coords.latitude,
              longitude:
                Math.random() * (0.0002) - 0.0001 + position.coords.longitude,
              id: 1,
              unlockedMessage: 'You found a shovel.'
            }
          ];
          while (markers.length < 3) {
            let newCoordinate = {
              latitude: Math.random() * (0.001) - 0.0006 + position.coords.latitude,
              longitude: Math.random() * (0.001) - 0.0006 + position.coords.longitude
            }
            if (!markers.some(oneMarker => geolib.getDistance(newCoordinate, oneMarker, 1) < bufferDistance)) {
              markers.push(newCoordinate);
            }
          }
          Object.assign(markers[1], {
            name: 'Key',
            id: 3,
            unlock: 'Shovel',
            lockedMessage: "Looks like something's buried here.",
            unlockedMessage: 'You use the shovel to dig up a tarnished old key.'
          });
          Object.assign(markers[2], {
            name: 'Chest',
            id: 2,
            unlock: 'Key',
            lockedMessage: "You found a chest! But its locked and you can't open it.",
            unlockedMessage: 'You found a chest! Maybe the key will open it.'
          });

          let bomb = [
            {
              name: 'Bomb',
              latitude: Math.random() * (0.0002) -
                0.0002 + position.coords.latitude,
              longitude:
                Math.random() * (0.0002) -
                0.0002 +
                position.coords.longitude,
              id: 4,
              unlockedMessage: 'You found the bomb! Do you remember the code to disarm it??'
            }
          ];

          this.setState({
            markers,
            bomb
          })

        },
      )
    }

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
      const finalTime = this.props.timeRemaining
      db.collection('games')
        .where('users', 'array-contains', this.state.user.uid)
        .where('open', '==', true)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            db.collection('games').doc(doc.id).update({
              open: false,
              time: finalTime,
              win: false
            })
          })
        })
    }

    //Bomb renders because user has accessed all three clues
    if (this.props.inventory.length === 3 && this.state.markers.length === 0) {
      db.collection('games').where('users', 'array-contains', this.state.user.uid).where('open', '==', true).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          this.setState({
            markers: doc.data().bomb,
          });
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
