import React from 'react';
import { Button, View, Image, Keyboard } from 'react-native';
import { RkText, RkAvoidKeyboard, RkStyleSheet } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { clearInventoryAction } from '../store/inventory';
import { thunk_resetTimer } from '../store/timer';
import { scaleVertical } from '../utils/scale';
import NavigationType from '../../config/navigation/propTypes';

const loseImages = [
  require('../../assets/loseImages/lose.gif'),
  require('../../assets/loseImages/boom.gif'),
  require('../../assets/loseImages/boom2.gif'),
];

class Lose extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired
  };
  static navigationOptions = {
    header: null
  };

  getRandomImage = () => loseImages[Math.floor(Math.random() * loseImages.length)];

  renderImage = () => (
    <Image
      style={styles.image}
      source={this.getRandomImage()}
    />
  );

  onNewGameButtonPressed = () => {
    this.props.clearInventory();
    this.props.resetTimer();
    this.props.navigation.navigate('Home');
  };

  render = () => (
    <RkAvoidKeyboard
      style={styles.screen}
      onStartShouldSetResponder={() => true}
      onResponderRelease={() => Keyboard.dismiss()}
    >
      <View style={styles.header}>
        <RkText style={styles.headerText} rkType="light h1">
          You failed your mission!
        </RkText>
        {this.renderImage()}
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

const mapStateToProps = state => ({
  inventory: state.inventory.inventory,
  timeRemaining: state.timer.timeRemaining,
  id: state.timer.id
});

const mapDispatchToProps = dispatch => {
  return {
    clearInventory: () => dispatch(clearInventoryAction()),
    resetTimer: () => dispatch(thunk_resetTimer())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lose);

const styles = RkStyleSheet.create(theme => ({
  screen: {
    //padding: scaleVertical(10),
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#333333'
  },
  image: {
    height: scaleVertical(200),
    resizeMode: 'contain'
  },
  header: {
    //paddingBottom: scaleVertical(10),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white'
  },
  content: {
    justifyContent: 'space-between'
  },
  save: {
    marginVertical: 20
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
    marginHorizontal: 24,
    justifyContent: 'space-around'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    borderColor: theme.colors.border.solid
  },
  footer: {}
}));
