import React from 'react'
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'

const Win = (props) => {
  return (
    <ScrollView>
      <View nativeID="winContainer" style={styles.winContainer}>
        <View nativeID="headerContainer" style={styles.headerContainer}>
          <Text style={styles.headerContent}>You de-fused the bomb!!!</Text>
        </View>

        <View nativeID="bodyContainer" style={styles.bodyContainer}>
          <Image
            source={require('../assets/win.png')}
            style={styles.winImage}
          />
          <View style={styles.startButtonContainer}>
            <Button
              color="black"
              style={styles.startButton}
              title="New Game"
              onPress={props.onPress} />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  winContainer: {
    display: 'flex',
    backgroundColor: 'green',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    padding: 50,
  },
  headerContainer: {
    backgroundColor: 'yellow',
    width: '100%',
    borderRadius: 5,
    // borderWidth: 3,
    // borderColor: 'black',
    padding: 20,
  },
  header: {
    fontSize: 30,
    color: 'black',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  winImage: {
    marginBottom: 30,
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
  start: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  startButtonContainer: {
    backgroundColor: 'goldenrod',
    padding: 10,
    borderRadius: 5,
    // borderWidth: 3,
    // borderColor: 'black',
  },
  startButton: {
    color: 'black'
  },
});

export default Win
