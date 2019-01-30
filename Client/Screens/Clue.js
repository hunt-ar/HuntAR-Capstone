import React from 'react'
import { Button, Image, ScrollView, Text, View } from 'react-native'
import { styles } from '../../assets/styles';

const Clue = (props) => {
  return (
    <ScrollView>
      <View nativeID="clueContainer" style={styles.clueContainer}>
        <View nativeID="headerContainer" style={styles.headerContainer}>
          <Text style={styles.headerContent}>I have the secret code for you. You can trust me. The code is 1234. Godspeed!</Text>
        </View>

        <View nativeID="bodyContainer" style={styles.bodyContainer}>
          <Image
            source={require('../../assets/1234.jpg')}
            style={styles.winImage}
          />
          <View style={styles.greenButtonContainer}>
            <Button
              title="Continue"
              onPress={() => { props.navigation.navigate('Map') }}
              color="black"
              style={styles.startButton} />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Clue
