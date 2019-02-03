import React from 'react';
import { Text, View, Button } from 'react-native';
import { styles } from '../../assets/styles';
import { connect } from 'react-redux';
// import { beginTimerAction } from '../store/timer'
import { thunk_beganTimer, thunk_stoppedTimer } from '../store/timer'

const timeRemaining = 300;

class StoryConcept extends React.Component {
  static navigationOptions = {
    title: 'StoryConcept'
  };

  render() {
    const id = this.props.id;
    return (
      <View style={styles.parentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.largeText}>We need your help!</Text>
          <Text style={styles.introText}>
            We have detected a ticking bomb in the area and need your help to disarm it before time runs out! Luckily, the tools needed to defuse the bomb are scattered nearby. We have marked their locations on your map. You may not be able to access some items before accessing others, so if you visit one item before another, you may have to come back. Collect all the items, then disarm the bomb. Please hurry, time is ticking!
          </Text>
        </View>
        <Text style={styles.medText}>Do you accept the mission?</Text>
        <View>
          <Button
            title="Yes! I am ready to be a hero."
            onPress={() => {
              this.props.beginTimer(timeRemaining);
              // this.props.navigation.navigate('Map')
            }}
          />
        </View>
        <View>
          <Button
            title="No, not today..."
            onPress={() => {
              this.props.stopTimer(id)
              // this.props.navigation.navigate('Home')
            }
            }
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  timeRemaining: state.timer.timeRemaining,
  id: state.timer.id
});

const mapDispatchToProps = dispatch => {
  return {
    beginTimer: (time) => dispatch(thunk_beganTimer(time)),
    stopTimer: (id) => dispatch(thunk_stoppedTimer(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryConcept);
