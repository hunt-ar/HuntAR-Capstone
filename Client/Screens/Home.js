import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import { styles } from '../../assets/styles';
import AwesomeButton from 'react-native-really-awesome-button';

const bombImage = require('../../assets/bomb.png');
const bombTrial = require('../../assets/bombTrial.png');

export default class Home extends React.Component {
  renderImage = () => <Image style={styles.image} source={bombTrial} />;

  render() {
    return (
      <View style={styles.HomeContainer}>
        <Text style={styles.HomeHeader}>DisARm</Text>
        <View style={styles.HomeImage}>{this.renderImage()}</View>
        <View style={styles.HomeButtons}>
          <AwesomeButton
            style={styles.HomeButton}
            onPress={() => {
              this.props.navigation.navigate('StoryConcept');
            }}
            backgroundColor="#ff4d4d"
            backgroundActive="#660000"
            springRelease={true}
            width={200}
            textSize={20}
          >
            New Game
          </AwesomeButton>
          <AwesomeButton
            style={styles.HomeButton}
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}
            backgroundColor="#ff4d4d"
            backgroundActive="#660000"
            springRelease={true}
            width={200}
            textSize={20}
          >
            Log In
          </AwesomeButton>
        </View>
      </View>
    );
  }
}
