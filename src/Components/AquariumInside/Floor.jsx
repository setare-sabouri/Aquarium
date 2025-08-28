import { RigidBody } from "@react-three/rapier";
import { useMemo } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

const Floor = ({ length,width }) => {

  // Texture Setup
  const texturePaths = [
    "/textures/sand/Sand_baseColor.jpg",
    "/textures/sand/Sand_normal.jpg",
    "/textures/sand/Sand_height.png",
    "/textures/sand/Sand_ambientOcclusio.jpg"
  ];
  const [colorMap, normalMap, heightMap, aoMap] = useLoader(THREE.TextureLoader, texturePaths);
  useMemo(() => {
    [colorMap, normalMap, heightMap, aoMap].forEach(tex => {
      if (tex) {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(3, length / 8);
      }
    });
  }, [colorMap, normalMap, heightMap, aoMap, length]);


  return (
    <>
      <RigidBody type="fixed" position={[0, -0.2, -length]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} >
          <planeGeometry args={[width * 2 + 0.8, length * 2, 50, 50]} />
          <meshStandardMaterial
            map={colorMap}
            normalMap={normalMap}
            aoMap={aoMap}
            displacementMap={heightMap}
            displacementScale={1}
          />
        </mesh>
      </RigidBody>

    </>
  );
};

export default Floor;

//checked
