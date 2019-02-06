import React, { Component } from 'react';
import { Text, View } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { styles } from '../../assets/styles';
import { connect } from 'react-redux';

class Inventory extends Component {
  render() {
    return (
      <View style={styles.parentContainer}>
        <Text style={styles.headerText}>INVENTORY</Text>
        <View flex={3}>
          {this.props.inventory.map((item, index) => {
            return (
              <View key={index}>
                <Text style={styles.medText}>{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
            );
          })}
        </View>
        <View flex={1}>
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
      </View>
    );
  }
}

const mapStateToProps = state => ({
  inventory: state.inventory.inventory
});

export default connect(mapStateToProps)(Inventory);
