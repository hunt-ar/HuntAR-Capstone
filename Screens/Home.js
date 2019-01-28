import React from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import StoryConcept from './StoryConcept'

export default class Home extends React.Component {
  // static navigationOptions = {
  //   title: 'Home'
  // }

  // onPressOnePlayer () {
  //     Alert.alert('You tapped the one-player button!')
  //  this.props.navigation.navigate('StoryConcept')
  // }
  onPressMultiPlayer () {
    Alert.alert('You tapped the multi-player button!')
  }
  onPressLoginSignup () {
    Alert.alert('You tapped the login/signup button!')
  }

  render() {
    return (
      <View>
        <View>
      <Text>  Game Title</Text> 
      </View>
      <View >
      <Button title="Start one-player game" onPress={ () => this.props.navigation.navigate('StoryConcept')}/>
      <Button title="Start multi-player game" onPress={this.onPressMultiPlayer}/>
      <Button title="Login or sign up" onPress={this.onPressLoginSignup}/>
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center'
  },
});