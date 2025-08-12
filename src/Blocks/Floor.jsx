import React from 'react'

const Floor = () => {
    return (
        <mesh position={[0, -1, 0]} receiveShadow>
            <boxGeometry args={[9, 0.5, 5]} />
            <meshStandardMaterial />
        </mesh>
    )
}

export default Floor
