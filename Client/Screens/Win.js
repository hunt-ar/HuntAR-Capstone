import React from 'react';
import {
  Button,
  View,
  Image,
  Keyboard,
  Alert
} from 'react-native';
import {
  RkText,
  RkAvoidKeyboard,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { db } from '../store'
import { thunk_resetTimer } from '../store/timer'
import { clearInventoryAction } from '../store/inventory';
import { scaleVertical } from '../utils/scale';
import NavigationType from '../../config/navigation/propTypes';


const winImages = [
  require('../../assets/winImages/comesaveday.gif'),
  require('../../assets/winImages/hero.gif'),
  require('../../assets/winImages/saveday.gif'),
  require('../../assets/winImages/win.gif')
];

class Win extends React.Component {
  constructor() {
    super();
    this.onSeeTimesButtonPressed = this.onSeeTimesButtonPressed.bind(this);
  }

  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    header: null,
  };

  getRandomImage = () => winImages[Math.floor(Math.random() * winImages.length)];

  renderImage = () => (
    <Image
      style={styles.image}
      source={this.getRandomImage()}
    />
  );
  onSeeTimesButtonPressed = () => {
    this.props.clearInventory();
    //Alert.alert(`Final time logged as ${finalTime}`)
      this.props.navigation.navigate('SeeTimes');
     };
 
  onNewGameButtonPressed = () => {
    this.props.clearInventory();
    this.props.navigation.navigate('Home');
  };

  render () {
    console.log(this.props)
    return (
    <RkAvoidKeyboard
      style={styles.screen}
      onStartShouldSetResponder={() => true}
      onResponderRelease={() => Keyboard.dismiss()}>
      <View style={styles.header}>
        {this.renderImage()}
        <RkText style={styles.headerText} rkType='light h1'>You're my hero!!</RkText>
      </View>
      <View style={styles.content}>
        <View>
        <Button
            title="See my final time"
            onPress={this.onSeeTimesButtonPressed}
            style={styles.save}
          />
          <Button
            title="Play Again"
            onPress={this.onNewGameButtonPressed}
            style={styles.save}
          />
        </View>
      </View>
    </RkAvoidKeyboard>
  );
}
}
const mapStateToProps = state => ({
  inventory: state.inventory.inventory,
  timeRemaining: state.timer.timeRemaining,
  id: state.timer.id
});

const mapDispatchToProps = dispatch => {
  return {
    setFinalTime: (time) => dispatch(setFinalTime(time)),
    stopTimer: id => dispatch(thunk_stoppedTimer(id)),
    resetTimer: () => dispatch(thunk_resetTimer()),
    clearInventory: () => dispatch(clearInventoryAction()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Win);

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