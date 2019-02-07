import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import { styles } from '../../assets/styles';
import { connect } from 'react-redux';
import AwesomeButton from 'react-native-really-awesome-button';

const time = require('../../assets/instructionPics/alarm-clock.png');
const backpack = require('../../assets/instructionPics/briefcase.png');
const tap = require('../../assets/instructionPics/tap.png');
const marker = require('../../assets/instructionPics/location-pin.png');
const order = require('../../assets/instructionPics/choice.png');

class StoryConcept extends React.Component {
  renderImage = () => <Image height={20} width={20} source={defaultAvatar} />;
  static navigationOptions = {
    title: 'StoryConcept'
  };

  render() {
    return (
      <View style={styles.StoryContainer}>
        <View alignItems="center">
          <Text style={styles.StoryHeader}>Mission Details</Text>
        </View>
        <View flex={1} flexDirection="row">
          <View left={0}>
            <Image left={0} style={{ width: 50, height: 50 }} source={marker} />
          </View>
          <Text flex="right" style={styles.StoryText}>
            Visit all the markers
          </Text>
        </View>
        <View flex={1} flexDirection="row">
          <Image left={0} style={{ width: 50, height: 50 }} source={tap} />
          <Text flex="right" style={styles.StoryText}>
            Tap the marker when in range to collect an item
          </Text>
        </View>
        <View flex={1} flexDirection="row">
          <Image style={{ width: 50, height: 50 }} source={backpack} />
          <Text style={styles.StoryText}>Check your inventory</Text>
        </View>
        <View flex={1} flexDirection="row">
          <Image style={{ width: 50, height: 50 }} source={order} />
          <Text style={styles.StoryText}>
            Get your items in a specific order
          </Text>
        </View>
        <View flex={1} flexDirection="row">
          <Image style={{ width: 50, height: 50 }} source={time} />
          <Text style={styles.StoryText}>Hurry, the clock is ticking</Text>
        </View>

        <View alignItems="center">
          <AwesomeButton
            style={styles.HomeButton}
            onPress={() => {
              this.props.navigation.navigate('Map');
            }}
            backgroundColor="#ff4d4d"
            backgroundActive="#660000"
            springRelease={true}
            width={200}
            textSize={20}
          >
            Accept Mission
          </AwesomeButton>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  timeRemaining: state.timer.timeRemaining,
  id: state.timer.id
});

export default connect(mapStateToProps)(StoryConcept);
