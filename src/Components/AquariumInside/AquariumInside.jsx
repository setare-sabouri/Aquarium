import Tunnel from './Tunnel'
import Floor from './Floor'
import Bubble from './Bubbles'
import TextGlobal from '../Globals/TextGlobal'
import Rocks from './Rock'
import Fishes from '../AquariumOutside.jsx/fishes'

const AquariumInside = () => {
    return (
        <>
            <TextGlobal text={"AQ Tunnel"} size={0.9} position={[-5, 5, -15]} rotation={[0,0.5,0]}/>
            <Tunnel length={100} />
            <Floor length={100} />
            <Bubble position={[-5, 0, -45]} />
            <Rocks count={10}  xRange={[-9, 9]} yRange={[0.3, 0.5]} zRange={[-5, -200]} scaleRange={[0.04, 0.17]} />
            <Fishes position={[20, 1, -40]}/>
            {/* <Fishes position={[-20, 1, -40]}/> */}


            
        </>
    )
}

export default AquariumInside
