import React from 'react';
import {
  Button,
  View,
  Image,
  Keyboard,
  Alert,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native';
import { WebView } from "react-native-webview";
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { FontAwesome } from '../../assets/icons';
import { GradientButton } from '../Components';
import { scaleVertical } from '../utils/scale';
import firebase from 'firebase'
import NavigationType from '../../config/navigation/propTypes';

export class Login extends React.Component {

  state = { email: '', password: '', loading: false }

  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    header: null,
  };

  renderImage = () => (
    <Image
      style={styles.image}
      source={require('../../assets/bomb.png')
      }
    />
  );

  //need to add login functionality
  handleLogin = () => {
    this.setState({ loading: true });

    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then( () => { this.setState({loading: false}); })
      .then( () => {this.props.navigation.navigate('Welcome'); })
      .catch( () => {
        //Login was not successful.
        this.setState({ loading: false })
        Alert.alert('Invalid username or password. Please try again or reset your password');
      })
  };

  //goes to sign up component
  onSignUpButtonPressed = () => {
    this.props.navigation.navigate('SignUp');
  };

    //goes to forgot password component
    onForgotButtonPressed = () => {
      this.props.navigation.navigate('ForgotPW');
    };

  componentDidMount() {
    //originally in a script tag
    firebase.auth().onAuthStateChanged(function(user) {
      window.user = user;
    })
    //If no user, sign in anonymously with firebase.auth().signInAnonymously()But if there is a user, log out out user details for potential debugging purposes.
  }

  render() {
    return this.state.loading === false ? (
      
    <RkAvoidKeyboard
      style={styles.screen}
      onStartShouldSetResponder={() => true}
      onResponderRelease={() => Keyboard.dismiss()}>
      <View style={styles.header}>
        {this.renderImage()}
        <RkText style={styles.headerText}>Sign In Brave Adventurer,</RkText>
        <RkText style={styles.subHeader}>Your Mission Awaits...</RkText>
      </View>
      <View style={styles.content}>
        <View>
          <RkTextInput rkType='rounded' placeholder='Email' onChangeText={email => this.setState({email})} value={this.state.email} />

          <RkTextInput rkType='rounded' placeholder='Password' secureTextEntry onChangeText={password => this.setState({password})} value={this.state.password} />

          <Button
            title="LOGIN"
            onPress={this.handleLogin}
            style={styles.save}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.textRow}>
            <RkText rkType='title'>Don’t have an account?</RkText>
          </View >
          <View style={styles.textRow}>
            <Button
              title="Sign Up Now!"
              onPress={this.onSignUpButtonPressed}
              style={styles.save}
            />
          </View>
          <View style={styles.textRow}>
            <Button
              title="Forgot Password?"
              onPress={this.onForgotButtonPressed}
              style={styles.save}
            />
          </View>
        </View>
      </View>

      <View style={styles.textRow}>
        <Button
          title="Go Back"
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}
          style={styles.save}
        />
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
    padding: scaleVertical(16),
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.screen.base,
  },
  image: {
    height: scaleVertical(150),
    resizeMode: 'contain',
  },
  header: {
    paddingBottom: scaleVertical(10),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  content: {
    justifyContent: 'space-between',
    marginBottom: 25
  },
  save: {
    marginVertical: 20,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
    marginHorizontal: 24,
    justifyContent: 'space-around',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    borderColor: theme.colors.border.solid,
  },
  footer: {
    marginVertical: 75
  },
  headerText: {
    fontSize: 30,
    color: 'black',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  subHeader: {
    fontSize: 25,
    color: 'black',
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
}));
