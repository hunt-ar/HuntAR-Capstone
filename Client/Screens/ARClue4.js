import React from 'react';
import { AR } from 'expo';
import { View, Button, Modal, Text } from 'react-native';
import { styles } from '../../assets/styles';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import { View as GraphicsView } from 'expo-graphics';
import ObjectLoader from '../utils/ObjectLoader';
import AwesomeButton from 'react-native-really-awesome-button';
import NavigationType from '../../config/navigation/propTypes';

import Bomb from '../../assets/ARBomb/bomb';

export default class ARBombToDefuse extends React.Component {
  constructor() {
    super();
    this.onDisarmPress = this.onDisarmPress.bind(this);
  }

  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    THREE.suppressExpoWarnings(true);
    ThreeAR.suppressWarnings();
  }

  onDisarmPress() {
    this.props.navigation.navigate('Disarm')
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GraphicsView
          style={{ flex: 1 }}
          onContextCreate={this.onContextCreate}
          onRender={this.onRender}
          onResize={this.onResize}
          isArEnabled
          isArCameraStateEnabled
          arTrackingConfiguration={AR.TrackingConfiguration.World}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute'
          }}
        >
          <View style={styles.parentContainer}>
            <AwesomeButton
              style={styles.quitButton}
              onPress={this.onDisarmPress}
              backgroundColor="#c64747"
              backgroundActive="#595757"
              springRelease={true}
              width={150}
            >
              Disarm
            </AwesomeButton>
          </View>
        </View>
      </View>
    );
  }

  onContextCreate = async ({ gl, scale: pixelRatio, width, height }) => {
    AR.setPlaneDetection('horizontal');

    this.renderer = new ExpoTHREE.Renderer({
      gl,
      pixelRatio,
      width,
      height
    });

    this.scene = new THREE.Scene();
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);
    this.points = new ThreeAR.Points();
    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);

    ObjectLoader.getThreeModel(
      Bomb,
      function (object) {
        object.scale.set(0.08, 0.08, 0.08);
        object.position.z = -0.9;
        object.rotateX(90);
        object.rotateY(90);

        this.scene.add(object);
      }.bind(this),
      function (error) {
        console.log(error);
      }
    );

    this.scene.add(new THREE.AmbientLight(0xffffff));
  };

  onResize = ({ x, y, scale, width, height }) => {
    if (!this.renderer) {
      return;
    }
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  onRender = delta => {
    if (this.getThreeModel) {
      this.getThreeModel.rotation.x += 2 * delta;
      this.getThreeModel.rotation.y += 1.5 * delta;
    }
    this.points.update();
    this.renderer.render(this.scene, this.camera);
  };
}
