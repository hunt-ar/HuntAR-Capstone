import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import { styles } from '../../assets/styles';
import { connect } from 'react-redux';
import firebase from 'firebase'
import { db } from '../store'
import AwesomeButton from 'react-native-really-awesome-button';

const explodeImage = require('../../assets/explode.png');
const defaultAvatar = require('../../assets/godfather.png');

class StoryConcept extends React.Component {

  constructor(){
    super()
    this.state = firebase.auth().currentUser
  }

  componentDidMount() {
    // console.log('***Confirm UserID***', this.state.uid)
  }

  renderImage = () => (
    <Image style={{ width: 60, height: 60 }} source={explodeImage} />
  );
  renderImage = () => <Image height={20} width={20} source={defaultAvatar} />;
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
          time: 60,
          bomb
        })
      },
      error => console.log({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 }
    )

    this.props.navigation.navigate('StoryConcept2');
  }

  render() {
    return (
      <View style={styles.parentContainer}>
        <View justifyContent="space-between" alignItems="stretch" flex={1}>
          <View marginTop={10} flex={1}>
            {this.renderImage()}
          </View>
          <View flex={2}>
            <View flex={1} flexDirection="column">
              <Text style={styles.StoryHeader}>Mission</Text>
              <Text style={styles.StoryHeader}>Critical...</Text>
            </View>
          </View>
        </View>
        <View flex={3}>
          <Text flex={2} style={styles.StoryText}>
            There is a ticking bomb nearby and you have to disarm it before it
            explodes! Luckily, the tools needed to defuse the bomb are scattered
            nearby.
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
          <AwesomeButton
            style={styles.HomeButton}
            onPress={this.handleStartGame}
            backgroundColor="#ff4d4d"
            backgroundActive="#660000"
            springRelease={true}
            width={200}
            textSize={20}
          >
            Mission Details
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
