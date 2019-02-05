import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../assets/styles';
import AwesomeButton from 'react-native-really-awesome-button';

export default class Disarm extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={styles.parentContainer}>
        <Text style={styles.headerText}>Enter Code</Text>

        <AwesomeButton
          style={styles.quitButton}
          onPress={() => {}}
          backgroundColor="#c64747"
          backgroundActive="#595757"
          springRelease={true}
          width={150}
        >
          Disarm
        </AwesomeButton>
      </View>
    );
  }
}
