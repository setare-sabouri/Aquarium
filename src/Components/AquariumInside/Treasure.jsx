import { Sphere, useGLTF } from '@react-three/drei';

const Treasure = () => {
  const Starfish =useGLTF('./models/starfish.glb')
  return (
    <primitive object={Starfish.scene} position={[0, 0, 0]} scale={6}/>
  );
};

export default Treasure;

//checked