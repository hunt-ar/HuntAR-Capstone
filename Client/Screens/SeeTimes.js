import React from "react";
import { Text, View, Button } from "react-native";
import { styles } from "../../assets/styles";
import { db } from '../store'
import { connect } from 'react-redux';
class SeeTimes extends React.Component {


  render() {
    return (
      <View style={styles.parentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.largeText}> You completed this game in..... </Text>
        </View>
        <View>
          <Button
            title="Start New Game"
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  inventory: state.inventory.inventory,
  timeRemaining: state.timer.timeRemaining,
  id: state.timer.id
});

const mapDispatchToProps = dispatch => {
  return {
    stopTimer: id => dispatch(thunk_stoppedTimer(id)),
    resetTimer:() => dispatch(thunk_resetTimer)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeeTimes);