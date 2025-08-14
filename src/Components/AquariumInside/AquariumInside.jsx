import React from 'react'
import Tunnel from './Tunnel'
import Floor from './Floor'
import Bubble from './Bubbles'
import TextGlobal from '../Globals/TextGlobal'


const AquariumInside = () => {
    return (
        <>
            <TextGlobal text={"Aquarium"} size={1} position={[-2, 5, -59]}/>
            <Tunnel length={30}/>
            <Floor length={30} />
            <Bubble position={[0,0,-55]}/>
        </>
    )
}

export default AquariumInside
