
import { Text3D,Float } from "@react-three/drei";
import { Center } from '@react-three/drei';
import * as THREE from 'three'
const TextGlobal = ({
  text,
  size,
  position = [0, 0, 0],
  onClick,
  onPointerOver,
  onPointerOut
}) => {


  return (
    <group position={position} >
      <Float
        speed={1.7}
        floatIntensity={1}
        rotationIntensity={1.3}
        floatRange={[0.5, 0.5]}
      >
        <Center>
          <Text3D
            font="./fonts/optimer_bold.typeface.json"
            size={size}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}  
            bevelOffset={0}
            bevelSegments={5}
            onClick={onClick}
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
            castShadow
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