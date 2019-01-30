import React, { Component } from 'react';
import AppNavigator from './AppNavigator'
import geolib from 'geolib'
import { Home, StoryConcept, Win } from './Client/Screens';

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
  render() {
    return (
      <AppNavigator />
    )
  }
  handleNewGamePress = () => {
    this.setState(initialState)
  }
}

export default App

