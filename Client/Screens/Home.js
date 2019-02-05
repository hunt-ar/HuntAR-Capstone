import React from "react";
import { Text, View, Button, Image } from "react-native";
import { styles } from "../../assets/styles";

const bombImage = require("../../assets/bomb.png");

export default class Home extends React.Component {
  renderImage = () => (
    <Image style={styles.image} source={bombImage} />
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
