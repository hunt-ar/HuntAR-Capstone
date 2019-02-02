import React from 'react';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';

export default class ObjectLoader extends React.Component {
  static getThreeModel(objectData, success, failure) {
    if (!failure) {
      failure = function() {};
    }
    if (!success) {
      failure = function() {};
    }
    if (!objectData) {
      failure('Object Data is Null');
      return;
    }

    //search for a format
    let format = objectData.formats.find(format => format.formatType === 'OBJ');
    if (format === undefined) {
      failure('No format found.');
      return;
    }
    //search for a resource
    let obj = format.root;
    let mtl = format.resources.find(resource => {
      return resource.url.endsWith('mtl');
    });
    let texture = format.resources.find(resource =>
      resource.url.endsWith('png')
    );
    let path = obj.url.slice(0, obj.url.indexOf(obj.relativePath));

    //load the MTL
    var mtlLoader = new MTLLoader();
    mtlLoader.setCrossOrigin(true);
    //mtlLoader.setResourcePath(path);
    mtlLoader.load(mtl.url, function(materials) {
      materials.preload();
      //load the obj
      var objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(obj.url, async function(object) {
        //if there is a texture, then apply it...
        if (texture !== undefined) {
          let textureUri = await AssetUtils.uriAsync(texture.url);
          let tex = new THREE.MeshBasicMaterial({
            map: await ExpoTHREE.loadAsync(textureUri)
          });
          object.traverse(child => {
            if (child instanceof THREE.Mesh) {
              child.material = tex;
            }
          });
        }
        //return the obj
        success(object);
      });
    });
  }
}
