import React from 'react';
import { Text, View, Button, Alert } from 'react-native';
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

  render() {
    return (
      <View style={styles.parentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.largeText}> Game Title</Text>
        </View>
        <View>
          <Button
            title="Start one-player game"
            onPress={() => {
              this.props.navigation.navigate('StoryConcept');
            }}
          />
          <Button
            title="Start multi-player game"
            onPress={() => this.props.navigation.navigate('Clue')}
          />
          <Button
          title="Login or sign up"
          onPress={() => { this.props.navigation.navigate('Win') }} />
        </View>
      </View>
    );
  }
}

