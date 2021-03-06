import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "../../assets/styles";
import AwesomeButton from "react-native-really-awesome-button";
import NavigationType from "../../config/navigation/propTypes";
import { connect } from "react-redux";
import {
  setFinalTime,
  thunk_stoppedTimer,
  thunk_resetTimer
} from "../store/timer";
import { Audio } from "expo";
import firebase from 'firebase'
import { db } from '../store';

class Disarm extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      user: {}
    };
    this.onDisarmSubmit = this.onDisarmSubmit.bind(this);
  }

  componentDidMount() {
    if (firebase.auth().currentUser){
      this.setState({ user: firebase.auth().currentUser })
    }
  }

  static propTypes = {
    navigation: NavigationType.isRequired
  };
  static navigationOptions = {
    header: null
  };

  playSound = async () => {
    const explodeSound = new Audio.Sound();
    try {
      await explodeSound.loadAsync(
        require("../../assets/sounds/explosion.mp3")
      );
      await explodeSound.playAsync();
    } catch (error) {
      console.error(error);
    }
  };

  async onDisarmSubmit() {
    const finalTime = this.props.timeRemaining;
    if (this.props.code === this.state.text) {
      this.props.setFinalTime(finalTime);
      await this.props.stopTimer(this.props.id);
      await this.props.resetTimer();

      //update db
      db.collection('games')
      .where('users', 'array-contains', this.state.user.uid)
      .where('open', '==', true)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          db.collection('games').doc(doc.id).update({
            open: false,
            time: finalTime,
            win: true
          })
        })
      }) 

      //Alert.alert(`Final time logged as ${finalTime}`)
      this.props.navigation.navigate("Win");
    } else {
      await this.props.stopTimer(this.props.id);
      this.playSound();
      await this.props.resetTimer();

      //update db
      db.collection('games')
      .where('users', 'array-contains', this.state.user.uid)
      .where('open', '==', true)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          db.collection('games').doc(doc.id).update({
            open: false,
            time: finalTime,
            win: false
          })
        })
      }) 

      this.props.navigation.navigate("Lose");
    }
  }

  // async onGoBack() {
  //   await this.props.navigation.navigate('Map');
  // }

  render() {
    return (
      <View style={styles.DisarmContainer}>
        <Text style={styles.SeeTimesHeader}>Enter the code here</Text>
        <View style style={styles.textInput}>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              width: 200,
              backgroundColor: "white"
            }}
            placeholder="_ _ _ _ _"
            returnKeyLabel="Disarm"
            placeholderTextColor="red"
            maxLength={5}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        </View>
        <AwesomeButton
          style={styles.disarmButton}
          onPress={this.onDisarmSubmit}
          backgroundColor="#c64747"
          backgroundActive="#595757"
          springRelease={true}
          width={150}
        >
          Disarm the Bomb
        </AwesomeButton>
        <AwesomeButton
          style={styles.disarmButton}
          onPress={() => {
            this.props.navigation.navigate("Map");
          }}
          backgroundColor="#c64747"
          backgroundActive="#595757"
          springRelease={true}
          width={150}
        >
          Back to Map
        </AwesomeButton>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  code: state.inventory.code,
  timeRemaining: state.timer.timeRemaining,
  id: state.timer.id
});

const mapDispatchToProps = dispatch => {
  return {
    setFinalTime: time => dispatch(setFinalTime(time)),
    stopTimer: id => dispatch(thunk_stoppedTimer(id)),
    resetTimer: () => dispatch(thunk_resetTimer())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Disarm);
