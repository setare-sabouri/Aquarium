import { RigidBody, BallCollider } from '@react-three/rapier';
import { useGLTF } from '@react-three/drei';

const Rock = ({ position, rotationY, radius, scale }) => {
  const { scene } = useGLTF('./models/rock.glb');

  return (
    <RigidBody
      rotation={[0, rotationY, 0]}
      colliders={false}
      type="fixed"
      position={position}
    >
      <BallCollider args={[radius]} />
      <primitive object={scene.clone()} scale={scale} />
    </RigidBody>
  );
};

export default Rock;
