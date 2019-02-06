import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from '../../assets/styles';
import AwesomeButton from 'react-native-really-awesome-button';
import NavigationType from '../../config/navigation/propTypes';
import { connect } from 'react-redux';
import Lose from './Lose';
import Win from './Win';

class Disarm extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      submitted: false
    };
    this.onDisarmSubmit = this.onDisarmSubmit.bind(this);
  }

  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    header: null,
  };

  onDisarmSubmit() {
    this.setState({
      submitted: true
    });
  }

  render() {
    return !this.state.submitted ? (
      <View style={styles.parentContainer}>
        <Text style={styles.headerText}>Enter Code</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            width: 200
          }}
          placeholder="0 0 0 0 0"
          returnKeyLabel="Disarm"
          placeholderTextColor="red"
          maxLength={5}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <AwesomeButton
          style={styles.quitButton}
          onPress={this.onDisarmSubmit}
          backgroundColor="#c64747"
          backgroundActive="#595757"
          springRelease={true}
          width={150}
        >
          Disarm
        </AwesomeButton>
      </View>
    ) : this.props.code === this.state.text ? (
      <React.Fragment>
        {this.props.navigation.navigate('Win')}
      </React.Fragment>
    ) : (
          <React.Fragment>
            {this.props.navigation.navigate('Lose')}
          </React.Fragment>
        );
  }
}

const mapStateToProps = state => ({
  code: state.inventory.code
});

export default connect(mapStateToProps)(Disarm);
