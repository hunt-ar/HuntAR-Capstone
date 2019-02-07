import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import { styles } from '../../assets/styles';
import { connect } from 'react-redux';
import firebase from 'firebase'
import { db } from '../store'
import { RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4 } from 'expo/build/av/Audio';

const explodeImage = require('../../assets/explode.png');

class StoryConcept extends React.Component {

  constructor(){
    super()
    this.state = firebase.auth().currentUser
  }

  componentDidMount() {
    console.log('*******', this.state.uid)
  }

  renderImage = () => (
    <Image style={{ width: 60, height: 60 }} source={explodeImage} />
  );
  static navigationOptions = {
    title: 'StoryConcept'
  };

  handleStartGame = () => {
    //creates an instance of a game with the user's ID referenced and generates the coordinates.
    const randomDistance = Math.random() * (0.0002 - 0.0001) + 0.0001;
    // let initialRegion;
    // console.log('random markers before', randomMarkers)
    navigator.geolocation.getCurrentPosition(
      position => {
        let initialRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
          error: null
        }
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
        ]
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
        ]

        db.collection('games').add({
          open: true,
          users: [this.state.uid],
          markers,
          initialRegion,
          bomb
        })
      },
      error => console.log({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 }
    )
    this.props.navigation.navigate('Map');
  }

  render() {
    return (
      <View style={styles.storyParentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>We need your help!</Text>
          <Text style={styles.introText}>
            There is a ticking bomb nearby and you have to disarm it before it
            explodes! Luckily, the tools needed to defuse the bomb are scattered
            nearby, and we have marked their locations on your map. Once you're
            close to a marker, tap it to reveal the tool. But be warned - you
            need to collect tools in the right order, because each tool helps
            you access another one. Collect all the items, then use them to
            disarm the bomb. Please hurry, time is running out!
          </Text>
          {this.renderImage()}
        </View>
        <Text style={styles.medText}>Do you accept the mission?</Text>
        <View>
          <Button
            title="Yes! I am ready to be a hero."
            onPress={this.handleStartGame}
          />
        </View>
        <View>
          <Button
            title="No, not today..."
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}
          />
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
