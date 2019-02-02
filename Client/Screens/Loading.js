//TO BE ADDED IN LATER. THIS WILL HELP GUIDE WHEN A USER IS ALREADY LOGGED IN.

import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { styles } from '../../assets/styles';

export default class Loading extends React.Component {

  // componentDidMount() {
	// 	firebase.auth().onAuthStateChanged(user => {
	// 		this.props.navigation.navigate(user ? 'StoryConcept' : 'Login')
	// 	})
	// }

  render() {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}