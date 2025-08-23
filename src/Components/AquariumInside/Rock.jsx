import { useGLTF } from '@react-three/drei'
import { BallCollider, RigidBody } from '@react-three/rapier'
import * as THREE from "three"
import { useMemo } from 'react'

const Rocks = ({count = 10,xRange = [-8, 8],yRange = [0.5, 0.5],zRange = [-50, -20],scaleRange = [0.1, 0.2],minCollider = 0.05}) => {

    const { scene: rockScene } = useGLTF('./models/rock.glb')
    
    const randomInRange = (min, max) => Math.random() * (max - min) + min

    // Generate rocks only once, positions/scales/rotations never change
    const rocks = useMemo(() => {
        return Array.from({ length: count }).map(() => ({
            position: [
                randomInRange(xRange[0], xRange[1]),
                randomInRange(yRange[0], yRange[1]),
                randomInRange(zRange[0], zRange[1])
            ],
            scale: randomInRange(scaleRange[0], scaleRange[1]),
            rotationX: randomInRange(0, Math.PI * 2)
        }))
    }, [])

    // Bounding box for collider calculation
    const bbox = new THREE.Box3().setFromObject(rockScene)
    const size = new THREE.Vector3()
    bbox.getSize(size)

    return (
        <>
            {rocks.map((rock, index) => {
                const radius = Math.max((Math.max(size.x, size.y, size.z) / 2) * rock.scale, minCollider)
                const rockClone = rockScene.clone()
                return (
                    <RigidBody key={index} colliders={false} type="fixed" position={rock.position} >
                        <BallCollider args={[radius]} position={[0, size.y / 2 * rock.scale - 0.7, 0]} />
                        <primitive object={rockClone} scale={rock.scale} rotation={[0, rock.rotationX, 0]} />
                    </RigidBody>
                )
            })}
        </>
    )
}

export default Rocks
