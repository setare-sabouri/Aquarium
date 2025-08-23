import Tunnel from './Tunnel'
import Floor from './Floor'
import Bubble from './Bubbles'
import TextGlobal from '../Globals/TextGlobal'
import Rocks from './Rock'



const AquariumInside = () => {
    return (
        <>
            <TextGlobal text={"AQ Tunnel"} size={0.9} position={[-5, 5, -15]} rotation={[0,0.5,0]}/>
            <Tunnel length={60} />
            <Floor length={60} />
            <Bubble position={[4, 0, -45]} />
             <Rocks count={10}  xRange={[-9, 9]} yRange={[0.3, 0.5]} zRange={[-5, -110]} scaleRange={[0.04, 0.17]} />

        </>
    )
}

export default AquariumInside
