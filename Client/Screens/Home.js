import React from 'react';
import { Text, View, Button, Alert, Image } from 'react-native';
import { styles } from '../../assets/styles';

export default class Home extends React.Component {
  onPressMultiPlayer() {
    Alert.alert('You tapped the multi-player button!');
  }
  onPressLoginSignup() {
    Alert.alert('You tapped the login/signup button!');
  }
  //In component did mount we will grab user location and store it in redux
  componentDidMount() {
    // navigator.geolocation.getCurrentPosition(
    //   position => {
    //     this.setState({
    //       region: {
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //         latitudeDelta: 0.00001,
    //         longitudeDelta: 0.00001,
    //         error: null
    //       }
    //     });
    //   },
    //   error => this.setState({ error: error.message }),
    //   { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 }
    // );
  }

  renderImage = () => (
    <Image
      style={styles.image}
      source={require('../../assets/bomb.png')
      }
    />
  );

  render() {
    return (
      <View style={styles.parentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.largeText}> disARm </Text>
          {this.renderImage()}
        </View>
        <View>
          <Button
            title="Start New Game"
            onPress={() => {
              this.props.navigation.navigate('StoryConcept');
            }}
          />
          
          {/* THIS LOGIC WILL NEED TO BE ADDED AFTER MVP ESTABLISHED. CONSIDER MOVING TO LOGGED-IN USER HOME SCREEN AS A NON-LOGGED IN USER SHOULD NOT BE ABLE TO START A MULTI-PLAYER GAME.
          <Button
            title="Start multi-player game"
            onPress={() => this.props.navigation.navigate('Clue')}
          /> */}
          <Button
            title="Log In"
            onPress={() => { this.props.navigation.navigate('Login') }} />
        </View>
      </View>
    );
  }
}

