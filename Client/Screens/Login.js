import React from 'react';
import {
  Button,
  View,
  Image,
  Keyboard,
  Alert
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { FontAwesome } from '../../assets/icons';
import { GradientButton } from '../Components';
import { scaleVertical } from '../utils/scale';
import NavigationType from '../../config/navigation/propTypes';

export class Login extends React.Component {

  constructor(){
    super()
    this.state={
      email:'',
      password:''
    }
  }

  // onSubmit(event) => {}

  // onChange(event) => {
  //   event.preventDefault();
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // }

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
  onLoginButtonPressed = () => {
    this.props.navigation.goBack();
    //this.onSubmit
  };

  //goes to sign up component
  onSignUpButtonPressed = () => {
    this.props.navigation.navigate('SignUp');
  };

    //goes to forgot password component
    onForgotButtonPressed = () => {
      this.props.navigation.navigate('ForgotPW');
    };

  render = () => (
    <RkAvoidKeyboard
      style={styles.screen}
      onStartShouldSetResponder={() => true}
      onResponderRelease={() => Keyboard.dismiss()}>
      <View style={styles.header}>
        {this.renderImage()}
        <RkText style={styles.headerText}>Sign In Brave Adventurer!</RkText>
        <RkText style={styles.subHeader}>Your Mission Awaits...</RkText>
      </View>
      <View style={styles.content}>
        <View>
          <RkTextInput rkType='rounded' placeholder='Username' />
          <RkTextInput rkType='rounded' placeholder='Password' secureTextEntry />
          <Button
            title="LOGIN"
            onPress={this.onLoginButtonPressed}
            style={styles.save}
          />
        </View>
        {/* <View style={styles.buttons}>
          <RkButton style={styles.button} rkType='social'>
            <RkText rkType='awesome hero'>{FontAwesome.twitter}</RkText>
          </RkButton>
          <RkButton style={styles.button} rkType='social'>
            <RkText rkType='awesome hero'>{FontAwesome.google}</RkText>
          </RkButton>
          <RkButton style={styles.button} rkType='social'>
            <RkText rkType='awesome hero'>{FontAwesome.facebook}</RkText>
          </RkButton> */}
        {/* </View> */}
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
    </RkAvoidKeyboard>
  );
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: scaleVertical(16),
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.screen.base,
  },
  image: {
    height: scaleVertical(77),
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
  }
}));