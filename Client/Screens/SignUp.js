import React from 'react';
import {
  View,
  Image,
  Keyboard,
  StyleSheet,
  Text, 
  TextInput, 
  Button,
  ActivityIndicator
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkAvoidKeyboard,
} from 'react-native-ui-kitten';
import { GradientButton } from '../Components';
import { scaleVertical } from '../utils/scale';
import firebase from 'firebase'
import NavigationType from '../../config/navigation/propTypes';

export class SignUp extends React.Component {

  state = { email: '', password: '', error: '', loading: false }

  static navigationOptions = {
    header: null,
  };
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  handleSignUp = () => {
    console.log('button press')
    console.log('****FIREBASE', firebase)
    this.setState({ loading: true });

    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( () => { this.setState({ error: '', loading: false}); })
      .then( () => {this.props.navigation.navigate('StoryConcept'); })
      .catch( () => {
        //Login was not successful.
        this.setState({ error: "We are unable to process your request at this time.", loading: false })
      })
  }

  renderImage = () => (
    <Image
      style={styles.image}
      source={require('../../assets/bomb.png')
      }
    />
  );

  //need to add sign up functionality
  handleSignUp = () => {
    this.props.navigation.goBack();
  };

  //need to add sign in functionality
  onSignInButtonPressed = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return this.state.loading === false ? (
    <RkAvoidKeyboard
      style={styles.screen}
      onStartShouldSetResponder={() => true}
      onResponderRelease={() => Keyboard.dismiss()}>
      <View style={{ alignItems: 'center' }}>
        {this.renderImage()}
        <RkText rkType='h1'>Registration</RkText>
      </View>
      <View style={styles.content}>
        <View>
          <RkTextInput rkType='rounded' placeholder='Email' onChangeText={email => this.setState({email})} value={this.state.email} />

          <RkTextInput rkType='rounded' placeholder='Password' secureTextEntry onChangeText={password => this.setState({password})} value={this.state.password} />
          
          <Button
            style={styles.save}
            title='SIGN UP'
            onPress={this.handleSignUp}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.textRow}>
            <RkText rkType='primary3'>Already have an account?</RkText>
            <RkButton rkType='clear' onPress={this.onSignInButtonPressed}>
              <RkText rkType='header6'>Sign in now</RkText>
            </RkButton>
          </View>
        </View>
      </View>
    </RkAvoidKeyboard>
  ) : (
    <View style={styles.loadingContainer}>
      <Text>Loading</Text>
      <ActivityIndicator size="large" />
    </View>
  )}
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: theme.colors.screen.base,
  },
  image: {
    marginBottom: 10,
    height: scaleVertical(77),
    resizeMode: 'contain',
  },
  content: {
    justifyContent: 'space-between',
  },
  save: {
    marginVertical: 20,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 24,
    marginHorizontal: 24,
    justifyContent: 'space-around',
  },
  footer: {
    justifyContent: 'flex-end',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
}));
