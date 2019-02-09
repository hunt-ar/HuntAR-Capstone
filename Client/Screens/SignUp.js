import React from 'react';
import {
  View,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  ScrollView
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
import { db } from '../store'

export class SignUp extends React.Component {

  state = { username: '', email: '', password: '', loading: false }


  static navigationOptions = {
    header: null,
  };
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  handleSignUp = () => {
    const { username, email, password } = this.state;
    //creates an authorized instance of a new user

    this.setState({ loading: true });

    firebase.auth().onAuthStateChanged(function (user) {
      if (user.isAnonymous === false){
        db.collection('users').doc(user.uid).set({
          username,
          email
        })
      }
    })

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => { this.setState({ loading: false }); })
      .then(() => { this.props.navigation.navigate('Welcome'); })
      .catch((error) => {
        //Login was not successful.
        this.setState({ loading: false })
        Alert.alert(`We are unable to process your request at this time. ${error}`);
      })
  }

  renderImage = () => (
    <Image
      style={styles.image}
      source={require('../../assets/bomb.png')
      }
    />
  );

  render() {
    return this.state.loading === false ? (
      <ScrollView>


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
              <RkTextInput rkType='rounded' placeholder='Username' onChangeText={username => this.setState({ username })} value={this.state.username} />

              <RkTextInput rkType='rounded' placeholder='Email' onChangeText={email => this.setState({ email })} value={this.state.email} />

              <RkTextInput rkType='rounded' placeholder='Password' secureTextEntry onChangeText={password => this.setState({ password })} value={this.state.password} />

              <Button
                style={styles.save}
                title='SIGN UP'
                onPress={this.handleSignUp}
              />
            </View>

            <View style={styles.footer}>
              <View style={styles.textRow}>
                <RkText rkType='primary3'>Already have an account?</RkText>
              </View>
              <View>
                <Button
                  onPress={() => {
                    this.props.navigation.navigate('Login');
                  }}
                  title="Sign In"
                  style={styles.save}
                />
              </View>
            </View>

            <View style={styles.footer}>
              <View>
                <Button
                  onPress={() => {
                    this.props.navigation.navigate('Home');
                  }}
                  title="Go Back"
                  style={styles.save}
                />
              </View>
            </View>
          </View>
        </RkAvoidKeyboard>
      </ScrollView>
    ) : (
        <View style={styles.loadingContainer}>
          <Text>Loading</Text>
          <ActivityIndicator size="large" />
        </View>
      )
  }
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
