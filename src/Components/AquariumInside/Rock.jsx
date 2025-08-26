import { useGLTF, Instances, Instance } from '@react-three/drei';
import { BallCollider, RigidBody } from '@react-three/rapier';
import { useMemo } from 'react';
import { randomInRange, BoundingSize } from '../../Utils/Math';

const Rocks = ({
  count = 10,
  xRange = [-8, 8],
  yRange = [0.5, 0.5],
  zRange = [-50, -100],
  scaleRange = [0.1, 0.2],
}) => {
  const gltf = useGLTF('./models/rock.glb');
  const { meshes, materials } = gltf;
  const meshKeys = Object.keys(meshes); // ['Object_2', 'Object_3', ...]
  const material = materials.crabbyrock_lq;

  // Pre-generate rock transformations
const rocks = useMemo(() => {
  return Array.from({ length: count }).map(() => {
    const scale = randomInRange(scaleRange[0], scaleRange[1]);
    const rotationZ = randomInRange(0, Math.PI * 2);
    const position = [
      randomInRange(xRange[0], xRange[1]),
      randomInRange(yRange[0], yRange[1]),
      randomInRange(zRange[0], zRange[1]),
    ];
    const radius = 0.5 * scale; // approximate radius if BoundingSize is expensive
    const colliderY = radius - 0.7;
    return { position, scale, rotationZ, radius, colliderY };
  });
}, [count, xRange[0], xRange[1], yRange[0], yRange[1], zRange[0], zRange[1], scaleRange[0], scaleRange[1]]);


  return (
    <>
      {meshKeys.map((key) => (
        <Instances key={key} geometry={meshes[key].geometry} material={material} >
          {rocks.map((rock, index) => (
            <RigidBody rotation={[-Math.PI/2,0 ,rock.rotationZ]} key={index} colliders={false} type="fixed" position={rock.position}>
              <BallCollider args={[rock.radius]} position={[0, rock.colliderY, 0]} />
              <Instance scale={rock.scale}  />
            </RigidBody>
          ))}
        </Instances>
      ))}
    </>
  );
};

export default Rocks;
