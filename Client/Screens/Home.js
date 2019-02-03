import React from "react";
import { Text, View, Button, Image } from "react-native";
import { styles } from "../../assets/styles";

export default class Home extends React.Component {
  renderImage = () => (
    <Image style={styles.image} source={require("../../assets/bomb.png")} />
  );

  render() {
    return (
      <View style={styles.parentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.largeText}> disARm </Text>
          {this.renderImage()}
        </View>
        <View>
          <Button
            title="Start New Game"
            onPress={() => {
              this.props.navigation.navigate("StoryConcept");
            }}
          />

          {/* THIS LOGIC WILL NEED TO BE ADDED AFTER MVP ESTABLISHED. CONSIDER MOVING TO LOGGED-IN USER HOME SCREEN AS A NON-LOGGED IN USER SHOULD NOT BE ABLE TO START A MULTI-PLAYER GAME.
          <Button
            title="Start multi-player game"
            onPress={() => this.props.navigation.navigate('Clue')}
          /> */}
          <Button
            title="Log In"
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
          />
        </View>
      </View>
    );
  }
}
