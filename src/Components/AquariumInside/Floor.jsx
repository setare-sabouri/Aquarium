import { RigidBody } from "@react-three/rapier";
import React, { useMemo } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

const Floor = ({ length }) => {
  const [
  colorMap,
    normalMap,
    heightMap,
    aoMap,
  ] = useLoader(THREE.TextureLoader, [
    "/textures/sand/Sand_baseColor.jpg",
    "/textures/sand/Sand_normal.jpg",
    "/textures/sand/Sand_height.png",
    "/textures/sand/Sand_ambientOcclusio.jpg"
  ]);

    // Repeat tiling so it doesn’t stretch
    useMemo(() => {
      [colorMap, normalMap, heightMap, aoMap].forEach((tex) => {
        if (tex) {
          tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
          tex.repeat.set(5, length / 5); 
        }
      });
    }, [colorMap, normalMap, heightMap, aoMap, length]);

  return (
    <>
      {/* Collider */}
      <RigidBody type="fixed" friction={1} restitution={0.2} position={[0, -0.2, -length]}>
        <mesh>
          <boxGeometry args={[20, 0.8, length * 2]} />
          <meshStandardMaterial transparent opacity={0} />
        </mesh>
      </RigidBody>

      {/* Sand plane */}
      <mesh position={[0, 0, -length]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, length * 2, 100, 100]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          aoMap={aoMap}
          displacementMap={heightMap}
          displacementScale={0.6}
        />
      </mesh>
    </>
  );
};

export default Floor;
