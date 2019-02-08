import React from 'react';
import { Text, View, Button, Image, Alert } from 'react-native';
import { styles } from '../../assets/styles';
import AwesomeButton from 'react-native-really-awesome-button';
import firebase from 'firebase'

const bombImage = require('../../assets/bomb.png');
const bombTrial = require('../../assets/bombTrial.png');

export default class Home extends React.Component {
  
  constructor(){
    super()
    this.state = {
      isAnonymous: false
    }
  }

  renderImage = () => <Image style={styles.image} source={bombImage} />;
  

  componentDidMount(){
    //sign in user anon user if not already signed in
    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.setState({
          isAnonymous: user.isAnonymous
        })
        
      } else {
        console.log('there is no user')
        firebase.auth().signInAnonymously()
          .catch(function(error) {
            Alert.alert(`An error occured. ${error}`);
          })
      }
    })
  }

  render() {
    return (
      <View style={styles.HomeContainer}>
        <Text style={styles.HomeHeader}>DisARm</Text>
        <View style={styles.HomeImage}>{this.renderImage()}</View>
        <View style={styles.HomeButtons}>
          <AwesomeButton
            style={styles.HomeButton}
            // onPress={this.startGame}
            onPress={() => {this.props.navigation.navigate('StoryConcept');}}
            backgroundColor="#ff4d4d"
            backgroundActive="#660000"
            springRelease={true}
            height={40}
            width={200}
            textSize={20}
          >
            New Game
          </AwesomeButton>
          {this.state.isAnonymous === true ?
            <AwesomeButton
              style={styles.HomeButton}
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}
              backgroundColor="#ff4d4d"
              backgroundActive="#660000"
              springRelease={true}
              height={40}
              width={200}
              textSize={20}
            >
              Log In
            </AwesomeButton>
            :
            <View>
              <AwesomeButton
                style={styles.HomeButton}
                onPress={() => {
                  this.props.navigation.navigate('Welcome');
                }}
                backgroundColor="#ff4d4d"
                backgroundActive="#660000"
                springRelease={true}
                height={40}
                width={200}
                textSize={20}
              >
                My Account
              </AwesomeButton>

              <AwesomeButton
                style={styles.HomeButton}
                onPress={() => {
                  this.props.navigation.navigate('Signout');
                }}
                backgroundColor="#ff4d4d"
                backgroundActive="#660000"
                springRelease={true}
                height={40}
                width={200}
                textSize={20}
              >
                Sign Out
              </AwesomeButton>
            </View>
          }
        </View>
      </View>
    );
  }
}
