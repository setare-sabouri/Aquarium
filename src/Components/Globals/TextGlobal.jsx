
import { Text3D, Float } from "@react-three/drei";
import { Center } from '@react-three/drei';
import * as THREE from 'three'
const TextGlobal = ({
  text,
  size,
  position = [0, 0, 0],
}) => {


  return (
    <group position={position} >
      <Float speed={2} rotationIntensity={2}>
        <Center>
          <Text3D
            font="./fonts/optimer_bold.typeface.json"
            size={size}
            height={0.2}
            curveSegments={4}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            {text}
            <meshToonMaterial color="blue" />
          </Text3D>
        </Center>
      </Float>
    </group>
  );
};

export default TextGlobal;