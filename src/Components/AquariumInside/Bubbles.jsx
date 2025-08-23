// BubbleConfig.js
import * as THREE from 'three';
import InstancedShapes from '../Globals/InstancedShapes';

export const bubbleGeometry = new THREE.SphereGeometry(0.1, 16, 16);

export const bubbleMaterial = new THREE.MeshStandardMaterial({
    color: "#aee4f5",
    transparent: true,
    opacity: 0.6,
    roughness: 0.1,
    metalness: 0.3
});


const Bubble = ({ position }) => {
    return (
        <group position={position}>
            <InstancedShapes count={40} geometry={bubbleGeometry} material={bubbleMaterial} range={{ x: 5, y: 5, z: 6 }} /> // only one call
        </group>
    )
}

export default Bubble
