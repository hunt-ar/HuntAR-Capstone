import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import { styles } from '../../assets/styles';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { db } from '../store';
import AwesomeButton from 'react-native-really-awesome-button';

const time = require('../../assets/instructionPics/alarm-clock.png');
const backpack = require('../../assets/instructionPics/briefcase.png');
const tap = require('../../assets/instructionPics/tap.png');
const marker = require('../../assets/instructionPics/location-pin.png');
const order = require('../../assets/instructionPics/choice.png');

class StoryConcept extends React.Component {
  constructor() {
    super();
    this.state = firebase.auth().currentUser;
  }

  componentDidMount() {
    // console.log('***Confirm UserID***', this.state.uid)
  }

  static navigationOptions = {
    title: 'StoryConcept'
  };

  handleStartGame = () => {
    //creates an instance of a game with the user's ID referenced and generates the coordinates.
    const randomDistance = Math.random() * (0.0002 - 0.0001) + 0.0001;

    navigator.geolocation.getCurrentPosition(
      position => {
        let markers = [
          {
            latitude: randomDistance + position.coords.latitude,
            longitude:
              Math.random() * (0.0004 - 0.0002) +
              0.0002 +
              position.coords.longitude,
            id: 1
          },
          {
            latitude: randomDistance + position.coords.latitude,
            longitude:
              Math.random() * (0.0004 - 0.0002) +
              0.0002 +
              position.coords.longitude,
            id: 2,
            unlock: 'Key'
          },
          {
            latitude: randomDistance + position.coords.latitude,
            longitude:
              Math.random() * (0.0004 - 0.0002) +
              0.0002 +
              position.coords.longitude,
            id: 3,
            unlock: 'Shovel'
          }
        ];
        let bomb = [
          {
            latitude: randomDistance + position.coords.latitude,
            longitude:
              Math.random() * (0.0004 - 0.0002) +
              0.0002 +
              position.coords.longitude,
            id: 4,
            unlock: 'Note'
          }
        ];

        db.collection('games').add({
          open: true,
          users: [this.state.uid],
          markers,
          time: 60,
          bomb
        });
      },
      error => console.log({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 }
    );

    this.props.navigation.navigate('Map');
  };

  render() {
    return (
      <View style={styles.StoryContainer}>
        <View alignItems="center">
          <Text style={styles.StoryHeader}>Mission Details</Text>
        </View>
        <View flex={1} flexDirection="row">
          <View left={0}>
            <Image left={0} style={{ width: 50, height: 50 }} source={marker} />
          </View>
          <Text flex="right" style={styles.StoryText}>
            Visit all the markers
          </Text>
        </View>
        <View flex={1} flexDirection="row">
          <Image left={0} style={{ width: 50, height: 50 }} source={tap} />
          <Text flex="right" style={styles.StoryText}>
            Tap the marker when in range to collect an item
          </Text>
        </View>
        <View flex={1} flexDirection="row">
          <Image style={{ width: 50, height: 50 }} source={backpack} />
          <Text style={styles.StoryText}>Check your inventory</Text>
        </View>
        <View flex={1} flexDirection="row">
          <Image style={{ width: 50, height: 50 }} source={order} />
          <Text style={styles.StoryText}>
            Get your items in a specific order
          </Text>
        </View>

        <View flex={1} flexDirection="row">
          <Image style={{ width: 50, height: 50 }} source={time} />
          <Text style={styles.StoryText}>Hurry, the clock is ticking</Text>
        </View>

        <View alignItems="center">
          <AwesomeButton
            style={styles.HomeButton}
            onPress={this.handleStartGame}
            backgroundColor="#ff4d4d"
            backgroundActive="#660000"
            springRelease={true}
            width={200}
            textSize={20}
          >
            Accept Mission
          </AwesomeButton>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  timeRemaining: state.timer.timeRemaining,
  id: state.timer.id
});

export default connect(mapStateToProps)(StoryConcept);
