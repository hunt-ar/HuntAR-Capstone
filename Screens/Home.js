import React from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import StoryConcept from './StoryConcept'

export default class Home extends React.Component {
  // static navigationOptions = {
  //   title: 'Home'
  // }

  onPressOnePlayer () {
      Alert.alert('You tapped the one-player button!')
  //  this.props.navigation.navigate('StoryConcept')
  }
  onPressMultiPlayer () {
    Alert.alert('You tapped the multi-player button!')
  }
  onPressLoginSignup () {
    Alert.alert('You tapped the login/signup button!')
  }

  render() {
    return (
      <View>
        <View style = {styles.title}>
      <Text style = {styles.titleText}>  Game Title</Text> 
      </View>
      <View style = {styles.container}>
      <Button title="Start one-player game" onPress={this.onPressOnePlayer}/>
      <Button title="Start multi-player game" onPress={this.onPressMultiPlayer}/>
      <Button title="Login or sign up" onPress={this.onPressLoginSignup}/>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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

// export default StackNavigator({
//   Home: {
//     screen: Home
//   },
  // StoryConcept: {
  //   screen: StoryConcept
  // }
// })