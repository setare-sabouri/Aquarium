import { Text3D, Float } from "@react-three/drei";

const TextGlobal = ({ text, size, position = [0, 0, 0], rotation = [0, 0, 0] }) => {

  return (
    <group position={position} rotation={rotation}>
      <Float speed={4} rotationIntensity={2}>

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
            <meshStandardMaterial
              color="#63B3ED"        
              emissive="#63B3ED"    
              emissiveIntensity={1}
            />
          </Text3D>

      </Float>
    </group>
  );
};

export default TextGlobal;
