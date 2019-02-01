import React from 'react';
import {
  Button,
  View,
  Image,
  Keyboard,
} from 'react-native';
import {
  RkText,
  RkAvoidKeyboard,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { scaleVertical } from '../utils/scale';
import NavigationType from '../../config/navigation/propTypes';

export default class Lose extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    header: null,
  };

  renderImage = () => (
    <Image
      style={styles.image}
      source={require('../../assets/lose.gif')
      }
    />
  );

  onNewGameButtonPressed = () => {
    this.props.navigation.navigate('Home');
  };

  render = () => (
    <RkAvoidKeyboard
      style={styles.screen}
      onStartShouldSetResponder={() => true}
      onResponderRelease={() => Keyboard.dismiss()}>
      <View style={styles.header}>
        {this.renderImage()}
        <RkText style={styles.headerText} rkType='light h1'>You didn't defuse the bomb in time!</RkText>
      </View>
      <View style={styles.content}>
        <View>
          <Button
            title="Try Again"
            onPress={this.onNewGameButtonPressed}
            style={styles.save}
          />
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
    height: scaleVertical(200),
    resizeMode: 'contain',
  },
  header: {
    paddingBottom: scaleVertical(10),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  headerText: {
    marginTop: 15,
    fontSize: 30,
    fontWeight: 'bold'
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