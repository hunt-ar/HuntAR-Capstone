import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import { styles } from '../../assets/styles';
import { connect } from 'react-redux';
import firebase from 'firebase'
import { db } from '../store'

const explodeImage = require('../../assets/explode.png');

class StoryConcept extends React.Component {

  constructor(){
    super()
    this.state = firebase.auth().currentUser
  }

  componentDidMount() {
    console.log('*******', this.state.uid)
  }

  renderImage = () => (
    <Image style={{ width: 60, height: 60 }} source={explodeImage} />
  );
  static navigationOptions = {
    title: 'StoryConcept'
  };

  handleStartGame = () => {
    //creates an instance of a game with the user's ID referenced
    db.collection('games').add({
      open: true,
      users: [this.state.uid]
    })
    this.props.navigation.navigate('Map');
  }

  render() {
    return (
      <View style={styles.storyParentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>We need your help!</Text>
          <Text style={styles.introText}>
            There is a ticking bomb nearby and you have to disarm it before it
            explodes! Luckily, the tools needed to defuse the bomb are scattered
            nearby, and we have marked their locations on your map. Once you're
            close to a marker, tap it to reveal the tool. But be warned - you
            need to collect tools in the right order, because each tool helps
            you access another one. Collect all the items, then use them to
            disarm the bomb. Please hurry, time is running out!
          </Text>
          {this.renderImage()}
        </View>
        <Text style={styles.medText}>Do you accept the mission?</Text>
        <View>
          <Button
            title="Yes! I am ready to be a hero."
            onPress={this.handleStartGame}
          />
        </View>
        <View>
          <Button
            title="No, not today..."
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
  timeRemaining: state.timer.timeRemaining,
  id: state.timer.id
});

export default connect(mapStateToProps)(StoryConcept);
