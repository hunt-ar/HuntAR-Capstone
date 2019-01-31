import React from 'react'
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { styles } from '../../assets/styles';

const Win = (props) => {
  return (
    <ScrollView>
      <View nativeID="winContainer" style={styles.winContainer}>
        <View nativeID="headerContainer" style={styles.headerContainer}>
          <Text style={styles.headerContent}>You de-fused the bomb!!!</Text>
        </View>

        <View nativeID="bodyContainer" style={styles.bodyContainer}>
          <Image
            source={require('../../assets/win.png')}
            style={styles.winImage}
          />
          <View style={styles.greenButtonContainer}>
            <Button
              title="New Game"
              color="black"
              style={styles.startButton}
              onPress={() => { props.navigation.navigate('Home') }} />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Win
