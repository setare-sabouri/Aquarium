import { useGLTF } from '@react-three/drei';
import { BallCollider, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useMemo, useCallback } from 'react';
import { randomInRange,BoundingSize } from '../../Utils/Math';


const Rocks = ({
  count = 10,
  xRange = [-8, 8],
  yRange = [0.5, 0.5],
  zRange = [-50, -100],
  scaleRange = [0.1, 0.2],
}) => {
  const { scene } = useGLTF('./models/rock.glb');

  const rockSize = BoundingSize(scene)
  
  // Generate rocks attributes
  const rocks = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      const scale = randomInRange(scaleRange[0], scaleRange[1]);
      const radius = (Math.max(rockSize.x, rockSize.y, rockSize.z) / 2) * scale;
      const colliderY = (rockSize.y / 2) * scale - 0.7;

      return {
        object: scene.clone(),
        position: [
          randomInRange(xRange[0], xRange[1]),
          randomInRange(yRange[0], yRange[1]),
          randomInRange(zRange[0], zRange[1]),
        ],
        scale,
        rotationY: randomInRange(0, Math.PI * 2),
        radius,
        colliderY,
      };
    });
  }, [count, xRange, yRange, zRange, scaleRange, scene, rockSize]);


  return (
    <>
      {rocks.map((rock, index) => (
        <RigidBody key={index} colliders={false} type="fixed" position={rock.position}>
          <BallCollider args={[rock.radius]} position={[0, rock.colliderY, 0]} />
          <primitive object={rock.object} scale={rock.scale} rotation={[0, rock.rotationY, 0]} />
        </RigidBody>
      ))}

    </>
  );
};

export default Rocks;