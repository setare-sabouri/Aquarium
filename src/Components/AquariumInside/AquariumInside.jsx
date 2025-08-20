import Tunnel from './Tunnel'
import Floor from './Floor'
import Bubble from './Bubbles'
import TextGlobal from '../Globals/TextGlobal'


const AquariumInside = () => {
    return (
        <>
            <TextGlobal text={"AQ Tunnel"} size={0.9} position={[-5, 5, -9]} rotation={[0,0.5,0]}/>
            <Tunnel length={60} />
            <Floor length={60} />
            <Bubble position={[0, 0, -55]} />

        </>
    )
}

export default AquariumInside
