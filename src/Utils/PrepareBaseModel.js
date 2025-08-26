import * as THREE from 'three';

export function createModelFactory(scene) {
  // Compute bounding box
  const boundingBox = new THREE.Box3().setFromObject(scene);
  const Modelsize = new THREE.Vector3();
  boundingBox.getSize(Modelsize);

  // Freeze scene 
  scene.traverse((child) => {
    if (child.isMesh) {
      child.frustumCulled = false;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  // Factory object
  return {
    Modelsize,
    create({ scale = 1, rotationY = 0 } = {}) {
      const group = new THREE.Group();
      group.scale.set(scale, scale, scale);
      group.rotation.set(0, rotationY, 0);
      group.add(scene.clone(true));
      return group;
    },
  };
}
