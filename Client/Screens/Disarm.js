import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from '../../assets/styles';
import AwesomeButton from 'react-native-really-awesome-button';
import NavigationType from '../../config/navigation/propTypes';
import { connect } from 'react-redux';
import { setFinalTime, thunk_stoppedTimer, thunk_resetTimer } from '../store/timer'

class Disarm extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
    this.onDisarmSubmit = this.onDisarmSubmit.bind(this);
  }

  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    header: null,
  };

  onDisarmSubmit() {
    if (this.props.code === this.state.text) {
      const finalTime = this.props.timeRemaining;
      this.props.setFinalTime(finalTime);
      this.props.stopTimer(this.id)
      this.props.resetTimer();
        //Alert.alert(`Final time logged as ${finalTime}`)
      this.props.navigation.navigate('Win')
    } else {
      this.props.navigation.navigate('Lose');
    }
  }

  render() {
    return (
      <View style={styles.parentContainer}>
        <Text style={styles.headerText}>Enter Code</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            width: 200
          }}
          placeholder="* * * * *"
          returnKeyLabel="Disarm"
          placeholderTextColor="red"
          maxLength={5}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <AwesomeButton
          style={styles.quitButton}
          onPress={this.onDisarmSubmit}
          backgroundColor="#c64747"
          backgroundActive="#595757"
          springRelease={true}
          width={150}
        >
          Disarm
        </AwesomeButton>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  code: state.inventory.code,  
  timeRemaining: state.timer.timeRemaining,
  id: state.timer.id
});

const mapDispatchToProps = dispatch => {
  return {
    setFinalTime: (time) => dispatch(setFinalTime(time)),
    stopTimer: id => dispatch(thunk_stoppedTimer(id)),
    resetTimer: () => dispatch(thunk_resetTimer()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Disarm);
