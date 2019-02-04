import React from 'react';
import {
  View,
  Image,
  Keyboard,
  Button,
  Alert,
  Text,
  ActivityIndicator
} from 'react-native';
import {
  RkStyleSheet,
  RkText,
  RkTextInput
} from 'react-native-ui-kitten';
import { scaleVertical } from '../utils/scale';
import NavigationType from '../../config/navigation/propTypes';
import firebase from 'firebase'

class ForgotPW extends React.Component {

  state = { email: '', loading: false }

  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    header: null,
  };

  onSendButtonPressed = () => {
    this.setState({ loading: true });

    const { email } = this.state;
    firebase.auth().sendPasswordResetEmail(email)
      .then( () => {this.setState({loading:false})})
      .then( () => {Alert.alert('A reset password has been sent to the email provided')})
      .catch( (error) => {
        this.setState({ loading: false })
        Alert.alert(`We are unable to process your request at this time. ${error}`);
      })
  };

  renderImage = () => (
    <Image
      style={styles.image}
      source={require('../../assets/bomb.png')
      }
    />
  );

  render(){ 
    return this.state.loading === false ? (
      <View
        behavior='position'
        style={styles.screen}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => Keyboard.dismiss()}>

        <View>
          <View style={styles.header}>
            <RkText rkType='h1'>Password Recovery</RkText>
            {this.renderImage()}
          </View>
          <View style={styles.content}>
            <RkText rkType='secondary5 secondaryColor center'>
                Don't worry brave adventurer! Enter your email below to receive your password reset instructions.
            </RkText>
            <RkTextInput 
            rkType='rounded' 
            placeholder='Email' 
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            />
          </View>
        </View>

        <View>
          <Button
            style={styles.save}
            title="SEND"
            onPress={this.onSendButtonPressed}
          />
        </View>

        <View>
          <Button
            title="Go Back"
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}
            style={styles.save}
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

export default ForgotPW

const styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: scaleVertical(24),
    justifyContent: 'space-between',
    backgroundColor: theme.colors.screen.base,
  },
  header: {
		alignItems: 'center',
		marginTop: 150
  },
  image: {
    marginVertical: scaleVertical(27),
    height: scaleVertical(77),
    resizeMode: 'contain',
  },
  content: {
		alignItems: 'center',
		padding: 20,
		justifyContent: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));