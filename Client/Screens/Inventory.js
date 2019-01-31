import React, { Component } from 'react';
import { Text, View } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { styles } from '../../assets/styles';

export default class Inventory extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={styles.parentContainer}>
        <Text style={styles.largeText}>INVENTORY</Text>
        <AwesomeButton
          style={styles.quitButton}
          onPress={this.props.onBackPackClose}
          backgroundColor="#c64747"
          backgroundActive="#595757"
          springRelease={true}
          width={150}
        >
          Back
        </AwesomeButton>
      </View>
    );
  }
}
