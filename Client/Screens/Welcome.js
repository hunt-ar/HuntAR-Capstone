import React from 'react'
import { ScrollView, Image, Text, View, Alert } from 'react-native'
import firebase from 'firebase'
import { styles } from '../../assets/styles';
import AwesomeButton from 'react-native-really-awesome-button';
import { db } from '../store';

const avatarImages = [
  require('../../assets/avatars/bear.png'),
  require('../../assets/avatars/cat.jpg'),
  require('../../assets/avatars/deer.png'),
  require('../../assets/avatars/girl.png'),
  require('../../assets/avatars/girl2.png'),
  require('../../assets/avatars/guy.png'),
  require('../../assets/avatars/guy2.png'),
  require('../../assets/avatars/werewolf.png'),
  require('../../assets/avatars/zombie.png'),
];

export default class Welcome extends React.Component {

  constructor() {
    super()
    this.state = {
      user: firebase.auth().currentUser,
      username: '',
      email: ''
    }
  }

  componentDidMount() {
    const loggedIn = db.collection('users').doc(this.state.user.uid)
    loggedIn.get().then((doc) => {
      this.setState({
        email: doc.data().email,
        username: doc.data().username
      })
    }).catch(function (error) {
      console.log('Error getting document', error)
    })
  }

  getRandomImage = () => avatarImages[Math.floor(Math.random() * avatarImages.length)]

  renderImage = () => (
    <Image
      style={styles.userImage}
      source={this.getRandomImage()}
    />
  );

  render() {
    const { user, email, username, image } = this.state
    return (
      <ScrollView>
        <View style={styles.HomeContainer}>
          <View style={styles.HomeImage}>
            {this.renderImage()}
          </View>

          <View style={styles.GameButtons}>
            <Text style={styles.boldText}>
              Hello {username || email}!
				</Text>
            <Text style={styles.medium}>
              What do you want to do brave adventurer?
        </Text>
          </View>

          <View>
            <AwesomeButton
              style={styles.HomeButton}
              // onPress={this.startGame}
              onPress={() => { this.props.navigation.navigate('StoryConcept'); }}
              backgroundColor="#ff4d4d"
              backgroundActive="#660000"
              springRelease={true}
              height={40}
              width={250}
              textSize={18}
            >
              Start New Game
          </AwesomeButton>

            {/* THIS LOGIC WILL NEED TO BE ADDED AFTER MVP ESTABLISHED.*/}
            <AwesomeButton
              style={styles.HomeButton}
              // onPress={this.startGame}
              onPress={() => {
                Alert.alert('This feature is not yet available. Check back later.');
              }}
              backgroundColor="#ff4d4d"
              backgroundActive="#660000"
              springRelease={true}
              height={40}
              width={250}
              textSize={18}
            >
              Multiplayer Game
          </AwesomeButton>

            <AwesomeButton
              style={styles.HomeButton}
              // onPress={this.startGame}
              onPress={() => {
                Alert.alert('This feature is not yet available. Check back later.');
              }}
              backgroundColor="#ff4d4d"
              backgroundActive="#660000"
              springRelease={true}
              height={40}
              width={250}
              textSize={18}
            >
              See My Stats
          </AwesomeButton>

            <AwesomeButton
              style={styles.HomeButton}
              // onPress={this.startGame}
              onPress={() => {
                Alert.alert('This feature is not yet available. Check back later.');
              }}
              backgroundColor="#ff4d4d"
              backgroundActive="#660000"
              springRelease={true}
              height={40}
              width={250}
              textSize={18}
            >
              Change Avatar
          </AwesomeButton>

            <AwesomeButton
              style={styles.HomeButton}
              // onPress={this.startGame}
              onPress={() => {
                Alert.alert('This feature is not yet available. Check back later.');
              }}
              backgroundColor="#ff4d4d"
              backgroundActive="#660000"
              springRelease={true}
              height={40}
              width={250}
              textSize={18}
            >
              Update My Information
          </AwesomeButton>
          </View>

        </View>
      </ScrollView>
    )
  }
}
