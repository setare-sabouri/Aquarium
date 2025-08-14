import React from 'react'
import Tunnel from './Tunnel'
import Floor from './Floor'
import Bubble from './Bubbles'


const AquariumInside = () => {
    return (
        <>
            <Tunnel length={30}/>
            <Floor length={30} />
            <Bubble />
        </>
    )
}

export default AquariumInside
