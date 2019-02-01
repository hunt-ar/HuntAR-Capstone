import React from 'react';
import { Text, View, Modal } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Inventory } from './index';
import MapStyle from '../../assets/mapStyle';
import { styles } from '../../assets/styles';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      BackPackVisible: false,
      region: {
        latitude: 0,
        longitude: 0,
        error: null
      },
      markers: []
    };
    this.onBackPackPress = this.onBackPackPress.bind(this);
    this.onBackPackClose = this.onBackPackClose.bind(this);
  }

  onBackPackPress() {
    this.setState({
      BackPackVisible: true
    });
  }
  onBackPackClose() {
    this.setState({
      BackPackVisible: false
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
            error: null
          },
          markers: [
            {
              latitude: Math.random() * 0.0005 + position.coords.latitude,
              longitude: Math.random() * 0.0005 + position.coords.longitude,
              id: 1
            },
            {
              latitude: Math.random() * 0.0005 + position.coords.latitude,
              longitude: Math.random() * 0.0005 + position.coords.longitude,
              id: 2
            },
            {
              latitude: Math.random() * 0.0005 + position.coords.latitude,
              longitude: Math.random() * 0.0005 + position.coords.longitude,
              id: 3
            }
          ]
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 }
    );
  }

  render() {
    return this.state.region.latitude ? (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapStyle}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation
        >
          {this.state.markers.map(marker => (
            <Marker
              key={marker.id}
              coordinate={marker}
              onPress={() =>
                this.props.navigation.navigate(`ARClue${marker.id}`)
              }
            />
          ))}
        </MapView>
        <View flexDirection="row" padding={15}>
          <View style={styles.quitButtonContainer}>
            <AwesomeButton
              style={styles.quitButton}
              onPress={() => this.props.navigation.navigate('Home')}
              backgroundColor="#c64747"
              backgroundActive="#595757"
              springRelease={true}
              width={150}
            >
              Quit
            </AwesomeButton>
          </View>
          <View style={styles.backPackContainer}>
            <Icon.Button
              name="briefcase"
              style={styles.backPackButton}
              onPress={this.onBackPackPress}
              backgroundColor="transparent"
              size={50}
            />
          </View>
        </View>
        <Modal visible={this.state.BackPackVisible} animationType="slide">
          <Inventory onBackPackClose={this.onBackPackClose} />
        </Modal>
      </View>
    ) : (
      <Text>Loading...</Text>
    );
  }
}
