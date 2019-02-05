import React from "react";
import { Text, View, Button } from "react-native";
import { styles } from "../../assets/styles";

export default class SeeTimes extends React.Component {


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