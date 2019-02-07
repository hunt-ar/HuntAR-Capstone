import React from 'react';
import { AR } from 'expo';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../../assets/styles';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import { View as GraphicsView } from 'expo-graphics';
import { addItem } from '../store/inventory';
import ObjectLoader from '../utils/ObjectLoader';
import Key from '../../assets/ARKey/key';
import AwesomeButton from 'react-native-really-awesome-button';

class ARClue3 extends React.Component {
  constructor() {
    super();
    this.state = {
      key: {
        name: 'Key',
        description: 'Opens something.'
      }
    };
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  componentDidMount() {
    THREE.suppressExpoWarnings(true);
    ThreeAR.suppressWarnings();
  }

  onButtonPress() {
    this.props.addItem(this.state.key);
    this.props.navigation.navigate('Map');
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
            justifyContent: 'center',
            position: 'absolute',
            bottom: 25,
            alignItems: 'center'
          }}
        >
          <AwesomeButton
            style={styles.HomeButton}
            onPress={this.onButtonPress}
            backgroundColor="#004466"
            backgroundActive="#293d3d"
            springRelease={true}
            width={200}
            textSize={20}
          >
            Pick up key
          </AwesomeButton>
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
    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);

    ObjectLoader.getThreeModel(
      Key,
      function(object) {
        object.scale.set(0.08, 0.08, 0.08);
        object.position.z = -1;
        this.scene.add(object);
      }.bind(this),
      function(error) {
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

  onRender = () => {
    this.renderer.render(this.scene, this.camera);
  };
}

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(
  null,
  mapDispatchToProps
)(ARClue3);
