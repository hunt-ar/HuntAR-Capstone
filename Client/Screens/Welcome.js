import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button, Alert, ActivityIndicator } from 'react-native'
import firebase from 'firebase'
import { styles } from '../../assets/styles';

// const user = firebase.auth().currentUser

export default class Welcome extends React.Component {

  constructor(){
    super()
    this.state = {
      user: firebase.auth().currentUser,
      image : '',
      loading: false
    }
  }
  
  onSignOutButtonPressed = () => {
    this.setState({ loading: true })
    firebase.auth().signOut()
      .then( () => {this.setState({loading:false})} )
      .then( () => {Alert.alert('You have been signed out')} )
      .then( () => {this.props.navigation.navigate('Home'); })
      .catch( () => {
        this.setState({ loading: false })
        Alert.alert("We are unable to process your request at this time");
      })
  }
  
  renderImage = () => (
    <Image
      style={styles.image}
      source={require('../../assets/avatars/cat.jpg')
      }
    />
  );

  render() {
    console.log()
		const { user, image } = this.state
    return this.state.loading === false ? (
			<View style={styles.parentContainer}>
        <View>
          {this.renderImage()}
        </View>

        <View>
				<Text style={styles.header}>
					Hello {user.email}!
				</Text>
        <Text style={styles.medium}>
					What do you want to do brave adventurer?
        </Text>
        </View>

        <View>
          <Button
            title="Start New Game"
            onPress={() => {
              this.props.navigation.navigate('StoryConcept');
            }}
          />
        </View>

        {/* THIS LOGIC WILL NEED TO BE ADDED AFTER MVP ESTABLISHED.*/}
        <View>
          <Button
            title="Multiplayer Game"
            onPress={() => {
              Alert.alert('This feature is not yet available. Check back later.');
            }}
          />
        </View>

        <View>
          <Button
            title="See My Stats"
            onPress={() => {
              Alert.alert('This feature is not yet available. Check back later.');
            }}
          />
        </View>

        <View>
          <Button
            title="Select New Avatar"
            onPress={() => {
              Alert.alert('This feature is not yet available. Check back later.');
            }}
          />
        </View>

        <View>
          <Button
            title="Update My Information"
            onPress={() => {
              Alert.alert('This feature is not yet available. Check back later.');
            }}
          />
        </View>

        <View>
          <Button
            title="Sign Out"
            onPress={this.onSignOutButtonPressed}
          />
        </View>

			</View>
    ) : (
      <View style={styles.loadingContainer}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )}
}
