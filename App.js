import React, { Component } from 'react';
import AppNavigator from './AppNavigator'
import geolib from 'geolib'
import { Home, StoryConcept, Win } from './Client/Screens';
import { Provider } from 'react-redux'
// import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
import xyw from 'react-redux-firebase'
import { store, rrfProps } from './Client/store'

const initialState = {
  count: 0,
  startLat: 0,
  startLon: 0,
  mapArea: null,
  p1Lat: 35.3349772,
  p1Lon: -120.74429429999999,
  p2Lat: null,
  p2Lon: null,
  p3Lat: null,
  p3Lon: null,
  bombLat: null,
  bombLon: null,
  currentLat: null,
  currentLon: null,
  distance: Infinity,
  started: false,
  error: null,
  hotter: false,
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // Setup react-redux so that connect HOC can be used
  render() {
    console.log('RRFP in app', xyw)
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          {/* <AppNavigator /> */}
        </ReactReduxFirebaseProvider>
      </Provider>
    )
  }
  handleNewGamePress = () => {
    this.setState(initialState)
  }
}

export default App

