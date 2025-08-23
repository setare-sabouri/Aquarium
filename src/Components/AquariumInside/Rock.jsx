import { useGLTF } from '@react-three/drei'
import { BallCollider, RigidBody } from '@react-three/rapier'
import * as THREE from "three"

const Rocks = ({
    count = 10,
    xRange = [-8, 8],
    yRange = [0.5, 0.5],
    zRange = [-50, -20],
    scaleRange = [0.1, 0.2],
    minCollider = 0.05 // minimum collider radius
}) => {
    const RockModel = useGLTF('./models/rock.glb')

    const randomInRange = (min, max) => Math.random() * (max - min) + min

    const rocks = Array.from({ length: count }).map(() => {
        const position = [
            randomInRange(xRange[0], xRange[1]),
            randomInRange(yRange[0], yRange[1]),
            randomInRange(zRange[0], zRange[1])
        ]
        const scale = randomInRange(scaleRange[0], scaleRange[1])
        const rotationX = randomInRange(0, Math.PI * 2)
        return { position, scale, rotationX }
    })

    // Bounding box for collider calculation
    const bbox = new THREE.Box3().setFromObject(RockModel.scene)
    const size = new THREE.Vector3()
    bbox.getSize(size)

    return (
        <>
            {rocks.map((rock, index) => {
                let radius = (Math.max(size.x, size.y, size.z) / 2) * rock.scale
                radius = Math.max(radius, minCollider) // ensure radius is not too small

                return (
                    <RigidBody key={index} colliders={false} type="fixed" position={rock.position}>
                        <BallCollider 
                            args={[radius]} 
                            position={[0, size.y / 2 * rock.scale - 0.7, 0]} 
                        />
                        <primitive 
                            object={RockModel.scene.clone()} 
                            scale={rock.scale} 
                            rotation={[0, rock.rotationX, 0]} // fixed typo
                        />
                    </RigidBody>
                )
            })}
        </>
    )
}

export default Rocks
