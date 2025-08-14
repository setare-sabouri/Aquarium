import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const InstancedShapes = ({ count, geometry, material,range={x:5,y:5,z:5} }) => {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const transforms = useMemo(() => {
    return [...Array(count)].map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * range.x,
        Math.random() * range.y,
        (Math.random() - 0.5) * range.z
      ),
      scale: 0.9 + Math.random() * 0.2,
    }));
  }, [count]);

  useFrame((_, delta) => {
    transforms.forEach((data, i) => {
      data.position.y += delta * 0.5;

      // reset near bottom but with a little random offset
      if (data.position.y > range.y) data.position.y = Math.random() * 0.5;

      dummy.position.copy(data.position);
      dummy.scale.set(data.scale, data.scale, data.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} />;
};

export default InstancedShapes;
