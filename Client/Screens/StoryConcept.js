import React from "react";
import { Text, View, Button, Image } from "react-native";
import { styles } from "../../assets/styles";

export default class StoryConcept extends React.Component {
  renderImage = () => (
    <Image style= {{width: 60, height: 60}} source={require("../../assets/explode.png")} />
  );
  static navigationOptions = {
    title: "StoryConcept"
  };

  render() {
    return (
      <View style={styles.storyParentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>We need your help!</Text>
        
          <Text style={styles.introText}>
            There is a ticking bomb nearby and you have to disarm it
            before it explodes! Luckily, the tools needed to defuse the bomb
            are scattered nearby, and we have marked their locations on your
            map. But be warned - you need to collect tools in the right order, because each tool helps you access another one. Collect all the items, then use them to disarm the bomb.
            Please hurry, time is running out!
          </Text>
          {this.renderImage()}
        </View>
        <Text style={styles.medText}>Do you accept the mission?</Text>
        <View>
          <Button
            title="Yes! I am ready to be a hero."
            onPress={() => this.props.navigation.navigate("Map")}
          />
        </View>
        <View>
          <Button
            title="No, not today..."
            onPress={() => this.props.navigation.navigate("Home")}
          />
        </View>
      </View>
    );
  }
}
