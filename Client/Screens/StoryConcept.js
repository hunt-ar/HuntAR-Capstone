import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import { styles } from '../../assets/styles';
import { connect } from 'react-redux';
import AwesomeButton from 'react-native-really-awesome-button';

const explodeImage = require('../../assets/explode.png');
const defaultAvatar = require('../../assets/godfather.png');

class StoryConcept extends React.Component {
  renderImage = () => <Image source={defaultAvatar} />;
  static navigationOptions = {
    title: 'StoryConcept'
  };

  render() {
    return (
      <View style={styles.parentContainer}>
        <View
          width="100%"
          justifyContent="space-between"
          flexDirection="row"
          flex={1}
        >
          <View marginTop={25} flex={1}>
            {this.renderImage()}
          </View>
          <View marginLeft={55} flex={2}>
            <Text style={styles.StoryHeader}>Mission Critical...</Text>
          </View>
        </View>
        <View flex={3}>
          <Text style={styles.StoryText}>
            There is a ticking bomb nearby and you have to disarm it before it
            explodes! Luckily, the tools needed to defuse the bomb are scattered
            nearby, and we have marked their locations on your map. Once you're
            close to a marker, tap it to reveal the tool. But be warned - you
            need to collect tools in the right order, because each tool helps
            you access another one. Collect all the items, then use them to
            disarm the bomb. Please hurry, time is running out!
          </Text>
        </View>
        <View>
          <AwesomeButton
            style={styles.HomeButton}
            onPress={() => {
              this.props.navigation.navigate('Map');
            }}
            backgroundColor="#ff4d4d"
            backgroundActive="#267326"
            springRelease={true}
            width={250}
            textSize={20}
          >
            Start Mission
          </AwesomeButton>
        </View>
        <View>
          <AwesomeButton
            style={styles.HomeButton}
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}
            backgroundColor="#ff4d4d"
            backgroundActive="#1a0000"
            springRelease={true}
            width={250}
            textSize={20}
          >
            Too Scared
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
