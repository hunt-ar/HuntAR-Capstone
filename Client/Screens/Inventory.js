import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { styles } from '../../assets/styles';
import { connect } from 'react-redux';

const item1 = require('../../assets/ItemPics/shovel.png');
const item2 = require('../../assets/ItemPics/key.png');
const item3 = require('../../assets/ItemPics/scroll.png');

class Inventory extends Component {
  render() {
    return (
      <View style={styles.StoryContainer}>
        <View alignItems="center">
          <Text style={styles.InventoryHeaderText}>Inventory</Text>
        </View>
        {this.props.inventory.map((item, index) => {
          return (
            <View flex={1} flexDirection="row" key={index}>
              <Image style={{ width: 50, height: 50 }} source={item.img} />
              <Text flex="right" style={styles.StoryText}>
                {item.description}
              </Text>
            </View>
          );
        })}

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

