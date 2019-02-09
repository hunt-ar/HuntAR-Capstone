import React from 'react';
import { AR } from 'expo';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../../assets/styles';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import { View as GraphicsView } from 'expo-graphics';
import { addItem, setCode } from '../store/inventory';
import ObjectLoader from '../utils/ObjectLoader';
import WoodChest from '../../assets/ARWoodChest/chest';
import AwesomeButton from 'react-native-really-awesome-button';
const item3 = require('../../assets/ItemPics/scroll.png');

class ARClue3 extends React.Component {
  constructor() {
    super();
    this.state = {
      chest: {
        name: 'Wooden Chest',
        description: '',
        img: item3
      }
    };
    this.onButtonPress = this.onButtonPress.bind(this);
    this.setCode = this.setCode.bind(this);
  }

  setCode() {
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += Math.floor(Math.random() * (9 - 0));
    }
    this.props.setCode(code);
    this.setState({
      chest: {
        description: `Crumpled up note with the numbers ${code} written on it.`,
        name: 'Crumpled Note',
        img: item3
      }
    });
  }

  componentDidMount() {
    THREE.suppressExpoWarnings(true);
    ThreeAR.suppressWarnings();
    this.setCode();
  }

  onButtonPress() {
    this.props.addItem(this.state.chest);
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
            justifyContent: 'flex-end',
            position: 'absolute',
            bottom: 25,
            alignItems: 'center',
            marginLeft: 60
          }}
        >
          <View>
            <AwesomeButton
              style={styles.HomeButton}
              onPress={this.onButtonPress}
              backgroundColor="#004466"
              backgroundActive="#293d3d"
              springRelease={true}
              width={200}
              textSize={20}
            >
              Pick up note
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
    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);

    ObjectLoader.getThreeModel(
      WoodChest,
      function(object) {
        object.scale.set(0.35, 0.35, 0.35);
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
  addItem: item => dispatch(addItem(item)),
  setCode: code => dispatch(setCode(code))
});

export default connect(
  null,
  mapDispatchToProps
)(ARClue3);
