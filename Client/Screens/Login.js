import React from "react";
import {
  Button,
  View,
  Image,
  Keyboard,
  Alert,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView
} from "react-native";

import { WebView } from "react-native-webview";
import {
  RkText,
  RkTheme,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkButton
} from "react-native-ui-kitten";
import { FontAwesome } from "../../assets/icons";
import { GradientButton } from "../Components";
import { scaleVertical } from "../utils/scale";
import firebase from "firebase";
import NavigationType from "../../config/navigation/propTypes";

const bombImage = require("../../assets/bomb.png");

export class Login extends React.Component {
  state = { email: "", password: "", loading: false };

  static propTypes = {
    navigation: NavigationType.isRequired
  };
  static navigationOptions = {
    header: null
  };

  renderImage = () => <Image style={styles.image} source={bombImage} />;

  //need to add login functionality
  handleLogin = () => {
    this.setState({ loading: true });

    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ loading: false });
      })
      .then(() => {
        this.props.navigation.navigate("Welcome");
      })
      .catch(error => {
        //Login was not successful.
        this.setState({ loading: false });
        Alert.alert(
          `We are unable to process your request at this time. ${error}`
        );
      });
  };

  //goes to sign up component
  onSignUpButtonPressed = () => {
    this.props.navigation.navigate("SignUp");
  };

  //goes to forgot password component
  onForgotButtonPressed = () => {
    this.props.navigation.navigate("ForgotPW");
  };

  componentDidMount() {
    //originally in a script tag
    firebase.auth().onAuthStateChanged(function(user) {
      window.user = user;
    });
    //If no user, sign in anonymously with firebase.auth().signInAnonymously()But if there is a user, log out out user details for potential debugging purposes.
  }

  render() {
    return this.state.loading === false ? (
      <ScrollView>
        <RkAvoidKeyboard
          style={styles.screen}
          onStartShouldSetResponder={() => true}
          onResponderRelease={() => Keyboard.dismiss()}
        >
          <View style={styles.HomeContainer}>
            <View>
              <RkText style={styles.headerText}>Sign In</RkText>
              {this.renderImage()}
              <RkText style={styles.subHeader}>Your Mission Awaits...</RkText>
            </View>
            <View style={styles.content}>
              <View>
                <RkTextInput
                  rkType="frame"
                  placeholder="Email"
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />

                <RkTextInput
                  rkType="frame"
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                />
                 <View style={styles.textRow}>
                <RkButton
                  style={{ backgroundColor: "#ff4d4d" }}
                  title="LOGIN"
                  onPress={this.handleLogin}
                >
                  LOGIN
                </RkButton>
                </View>
              </View>
              <View style={styles.footer}>
                <View style={styles.textRow}>
                  <RkText rkType="title"
                  style={{ color: "#ff4d4d" }}
                  >Don’t have an account?</RkText>
                </View>
                <View style={styles.textRow}>
                  <RkButton
                    style={{ backgroundColor: "#004466", width: 150 } }
                    
                    title="Sign Up Now!"
                    onPress={this.onSignUpButtonPressed}
                  >
                    Sign Up Now!
                  </RkButton>
                </View>
                <View style={styles.textRow}>
                  <RkButton
                    style={{ backgroundColor: "#004466", width: 150 }}
                    title="Forgot Password?"
                    onPress={this.onForgotButtonPressed}
                  >
                    Forgot Password?
                  </RkButton>
                </View>
              </View>
            </View>

            <View>
              <Button
                backgroundColor="#ff4d4d"
                title="Go Back"
                onPress={() => {
                  this.props.navigation.navigate("Home");
                }}
                style={styles.save}
              />
            </View>
          </View>
        </RkAvoidKeyboard>
      </ScrollView>
    ) : (
      <View style={styles.loadingContainer}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

RkTheme.setType("RkTextInput", "frame", {
  input: {
    backgroundColor: "white",
    marginLeft: 0,
    marginHorizontal: 0,
    borderRadius: 5
  },
  color: "gray",
  backgroundColor: "white",
  borderRadius: 10,
  container: {
    paddingHorizontal: 20
  }
});

const styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: scaleVertical(16),
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#004466"
  },
  image: {
    height: scaleVertical(150),
    resizeMode: "contain"
  },
  header: {
    paddingBottom: scaleVertical(10),
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  content: {
    justifyContent: "space-between",
    marginBottom: 25,
    backgroundColor: "004466",
    color: "white"
  },
  save: {
    marginVertical: 20,
    color: "white"
  },
  buttons: {
    flexDirection: "row",
    marginBottom: scaleVertical(24),
    marginHorizontal: 24,
    justifyContent: "space-around"
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    borderColor: "red",
    color: "white"
  },
  footer: {
    marginVertical: 50
  },
  headerText: {
    fontSize: 40,
    color: "white",
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight: "bold"
  },
  subHeader: {
    fontSize: 25,
    color: "white",
    textAlignVertical: "center",
    textAlign: "center"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
}));
