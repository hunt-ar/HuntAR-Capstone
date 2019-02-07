import React, { Component } from 'react';
import { Text, View } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { styles } from '../../assets/styles';
import { connect } from 'react-redux';

class Inventory extends Component {
  render() {
    return (
      <View style={styles.InventoryContainer}>
        <View alignItems="center">
          <Text style={styles.InventoryHeaderText}>INVENTORY</Text>
        </View>
        <View flex={3}>
          {this.props.inventory.map((item, index) => {
            return (
              <View key={index}>
                <View position="absolute" left={0}>
                  <Text style={styles.InventoryNameText}>{item.name}</Text>
                </View>
                <View>
                  <Text>{item.description}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 30
          }}
        >
          <AwesomeButton
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
