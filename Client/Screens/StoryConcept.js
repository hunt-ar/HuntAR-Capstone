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
          <Text style={styles.introText}>
            We have detected a ticking bomb in the area and need your help to disarm it before time runs out! Luckily, the tools needed to defuse the bomb are scattered nearby. We have marked their locations on your map. You may not be able to access some items before accessing others, so if you visit one item before another, you may have to come back. Collect all the items, then disarm the bomb. Please hurry, time is ticking!
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
            this.props.navigation.navigate('Home')} />
        </View>
      </View>
    );
  }
}
