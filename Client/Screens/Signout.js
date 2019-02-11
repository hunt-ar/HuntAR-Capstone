import React from 'react';
import { Text, View, Button, Image, Alert, ActivityIndicator} from 'react-native';
import { styles } from '../../assets/styles';
import AwesomeButton from 'react-native-really-awesome-button';
import firebase from 'firebase'

const bombImage = require('../../assets/bomb.png');

export default class Home extends React.Component {
  renderImage = () => <Image style={styles.image} source={bombImage} />;
  componentDidMount(){
    //sign out the current user
		firebase.auth().signOut()
			.then( () => {Alert.alert('You have been signed out')} )
			.then( () => {this.props.navigation.navigate('Home'); })
			.catch( (error) => {
        this.setState({ loading: false })
				Alert.alert(`We are unable to process your request at this time. ${error}`);
      })
  }

  render() {
    return (
      <View style={styles.loadingContainer}>
				<Text>Loading</Text>
				<ActivityIndicator size="large" />
      </View>
    );
  }
}
