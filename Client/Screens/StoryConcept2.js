import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import { styles } from '../../assets/styles';
import { connect } from 'react-redux';
import AwesomeButton from 'react-native-really-awesome-button';

const explodeImage = require('../../assets/explode.png');
const defaultAvatar = require('../../assets/godfather.png');

class StoryConcept extends React.Component {
  renderImage = () => <Image height={20} width={20} source={defaultAvatar} />;
  static navigationOptions = {
    title: 'StoryConcept'
  };

  render() {
    return (
      <View style={styles.parentContainer}>
        <View justifyContent="space-between" alignItems="stretch" flex={1}>
          <View marginTop={10} flex={1}>
            {this.renderImage()}
          </View>
          <View flex={2}>
            <View flex={1} flexDirection="column">
              <Text style={styles.StoryHeader}>Mission</Text>
              <Text style={styles.StoryHeader}>Critical...</Text>
            </View>
          </View>
        </View>
        <View flex={3}>
          <Text flex={2} style={styles.StoryText}>
            We have marked the locations of the tools you will need on a map.
            Once you're close to a marker, tap it to reveal the tool. You need
            to collect all the tools -- in the right order -- and then use them
            to disarm the bomb. Please hurry, time is running out!
          </Text>
        </View>
        <View>
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
            Start Mission
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
