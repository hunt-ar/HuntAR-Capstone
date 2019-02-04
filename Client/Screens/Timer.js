import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { styles } from '../../assets/styles';

class Timer extends React.Component {

  render() {
    const { timeRemaining } = this.props;
    const lowTime = 10;
    return (timeRemaining > lowTime) ? (
      <View>
        <Text style={styles.timerStyle}>
          {timeRemaining}
        </Text>
      </View>
    ) : (
        <View>
          <Text style={styles.timeAlmostUpStyle}>
            {timeRemaining}
          </Text>
        </View>
      )
  }
}

const mapStateToProps = state => ({
  timeRemaining: state.timer.timeRemaining,
  id: state.timer.id
});

const mapDispatchToProps = dispatch => {
  return {
    stopTimer: (id) => dispatch(thunk_stoppedTimer(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
