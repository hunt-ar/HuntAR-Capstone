import React from 'react';
import { Text, View, Button, Alert } from 'react-native';
import { styles } from '../../assets/styles';

export default class StoryConcept extends React.Component {
  static navigationOptions = {
    title: 'StoryConcept'
  };

  render() {
    return (
      <View style={styles.parentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.largeText}>We need your help!</Text>
          <Text>
            We have detected a ticking bomb in this area and you have to help us
            defuse it before time runs out! Three covert agents claim to have
            the secret code to deactivate the bomb, but two of them are working
            for the other side and are deliberately giving us false information.
            While we work to find out who the true agent is, you need to meet
            with all three agents and collect the secret codes that they give
            you.
          </Text>
          <Text>
            By the time you are done meeting with all three, we (hopefully!)
            will have identified who the true agent is and will pass this
            information to you. You will then need to go find the bomb and enter
            the agent's secret code to stop it from exploding!
          </Text>
        </View>
        <Text style={styles.medText}>Do you accept the mission?</Text>
        <View>
          <Button
            title="Yes! I am ready to be a hero."
            onPress={() => this.props.navigation.navigate('Map')} />
        </View>
        <View>
          <Button
            title="No, not today..."
            onPress={() =>
            this.props.navigation.navigate('Lose')} />
        </View>
      </View>
    );
  }
}
