import React from 'react';
import {
  Alert,
  View,
  Image,
  Keyboard,
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

  onLoginButtonPressed = () => {
    Alert.alert('You tapped the login/signup button!');
    // this.props.navigation.goBack();
  };

  onSignUpButtonPressed = () => {
    Alert.alert('You tapped the login/signup button!');
    // this.props.navigation.navigate('SignUp');
  };

  render = () => (
    <RkAvoidKeyboard
      style={styles.screen}
      onStartShouldSetResponder={() => true}
      onResponderRelease={() => Keyboard.dismiss()}>
      <View style={styles.header}>
        {this.renderImage()}
        <RkText rkType='light h1'>React Native</RkText>
        <RkText rkType='logo h0'>UI Kitten</RkText>
      </View>
      <View style={styles.content}>
        <View>
          <RkTextInput rkType='rounded' placeholder='Username' />
          <RkTextInput rkType='rounded' placeholder='Password' secureTextEntry />
          <GradientButton
            style={styles.save}
            rkType='large'
            text='LOGIN'
            onPress={this.onLoginButtonPressed}
          />
        </View>
        <View style={styles.buttons}>
          <RkButton style={styles.button} rkType='social'>
            <RkText rkType='awesome hero'>{FontAwesome.twitter}</RkText>
          </RkButton>
          <RkButton style={styles.button} rkType='social'>
            <RkText rkType='awesome hero'>{FontAwesome.google}</RkText>
          </RkButton>
          <RkButton style={styles.button} rkType='social'>
            <RkText rkType='awesome hero'>{FontAwesome.facebook}</RkText>
          </RkButton>
        </View>
        <View style={styles.footer}>
          <View style={styles.textRow}>
            <RkText rkType='primary3'>Don’t have an account?</RkText>
            <RkButton rkType='clear' onPress={this.onSignUpButtonPressed}>
              <RkText rkType='header6'>Sign up now</RkText>
            </RkButton>
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
  footer: {},
}));