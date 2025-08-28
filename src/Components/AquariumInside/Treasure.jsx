import { Sphere, useGLTF } from '@react-three/drei';

const Treasure = () => {
  const star =useGLTF('./models/starfish.glb')
  return (
    <Sphere args={[0.2, 16, 16]} position={[0, 0.3, 0]}>
      <meshStandardMaterial color="gold" />
    </Sphere>
  );
};

export default Treasure;