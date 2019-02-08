import React from "react";
import { Text, View, Button } from "react-native";
import { styles } from "../../assets/styles";
import { connect } from "react-redux";
import AwesomeButton from 'react-native-really-awesome-button';


class SeeTimes extends React.Component {
  render() {
    return (
      <View style={styles.TimesContainer}>
        <View style={styles.TimesHeader}>
          <View>
            <Text style={styles.SeeTimesHeader}>Mission Accomplished!</Text>
          </View>
          <Text style={styles.TimesText}>
            {" "}
            You completed this game with {this.props.finalTime} seconds to
            spare.
          </Text>
        </View>
        <View>
          <AwesomeButton
            style={styles.TimesButton}
            onPress={() => {
              this.props.navigation.navigate("Home");
            }}
            backgroundColor="#ff4d4d"
            backgroundActive="#660000"
            springRelease={true}
            width={200}
            textSize={20}
          >
            Start New Game
          </AwesomeButton>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  finalTime: state.timer.finalTime
});

const mapDispatchToProps = dispatch => {
  return {
    clearInventory: () => dispatch(clearInventoryAction())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeeTimes);
