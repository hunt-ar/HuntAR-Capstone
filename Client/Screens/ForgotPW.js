import React from 'react';
import {
  View,
  Image,
  Keyboard,
} from 'react-native';
import {
  RkStyleSheet,
  RkText,
  RkTextInput
} from 'react-native-ui-kitten';
import { GradientButton } from '../Components';
import { scaleVertical } from '../utils/scale';
import NavigationType from '../../config/navigation/propTypes';

class ForgotPW extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    header: null,
  };

  onSendButtonPressed = () => {
    this.props.navigation.goBack();
  };

  renderImage = () => (
    <Image
      style={styles.image}
      source={require('../../assets/bomb.png')
      }
    />
  );

  render = () => (
    <View
      behavior='position'
      style={styles.screen}
      onStartShouldSetResponder={() => true}
      onResponderRelease={() => Keyboard.dismiss()}>
      <View style={styles.header}>
				<RkText rkType='h1'>Password Recovery</RkText>
        {this.renderImage()}
      </View>
      <View style={styles.content}>
				<RkText rkType='secondary5 secondaryColor center'>
            Don't worry brave adventurer! Enter your email below to receive your password reset instructions.
        </RkText>
        <RkTextInput rkType='rounded' placeholder='Email' />
      </View>
      <GradientButton
        style={styles.save}
        rkType='large'
        text='SEND'
        onPress={this.onSendButtonPressed}
      />
    </View>
  );
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
}));