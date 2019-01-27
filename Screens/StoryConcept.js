import React from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native';


export default class StoryConcept extends React.Component {
  static navigationOptions = {
    title: 'StoryConcept'
  }

  onPressMap () {
    Alert.alert('You tapped the next screen button!')
  }


  render() {
    return (
      <View>
        <View style = {styles.title}>
      <Text style = {styles.titleText}>We need your help!</Text> 
      <Text style = {Styles.paragraphText}>We have detected a ticking bomb in this area and you have to help us defuse it before time runs out! Three covert agents claim to have the secret code to deactivate the bomb, but two of them are working for the other side and are deliberately giving us false information. While we work to find out who the true agent is, you need to meet with all three agents and collect the secret codes that they give you. By the time you are done meeting with all three, we (hopefully!) will have identified who the true agent is and will pass this information to you. You will then need to go find the bomb and enter the agent's secret code to stop it from exploding!</Text>
      </View>
      <View>Do you accept the mission?</View>
      <View style = {styles.container}>
      <Button title="Yes! I am ready to be a hero." onPress={this.onPressMap}/>
      <Button title="No, not today..." onPress={this.onPressMap}/>
      </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  title: {
    flex: 1,
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
  paragraphText: {
    fontSize: 10,
    fontWeight: 'bold',
    alignItems: 'center'
  },
});