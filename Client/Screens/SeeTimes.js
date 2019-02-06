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
          <Text style={styles.largeText}> You completed this game with {this.props.finalTime} seconds to spare.</Text>
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
finalTime: state.timer.finalTime
});

const mapDispatchToProps = dispatch => {
  return {
    clearInventory: () => dispatch(clearInventoryAction()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SeeTimes);
