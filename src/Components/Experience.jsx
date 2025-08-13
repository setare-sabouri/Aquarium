import { Physics } from '@react-three/rapier'
import TextGlobal from '../Globals/TextGlobal'
import Bubbles from './AquariumInside/Bubbles'
import Floor from './AquariumInside/Floor'
import Lights from '../Globals/Lights'
import './Experience.module.scss'
import Tunnel from './AquariumInside/Tunnel'
import Player from './Player/Player'
import AquariumInside from './AquariumInside/AquariumInside'

const Experience = () => {

  return (

      <Physics debug>
        <Lights />
        <AquariumInside/>
        <TextGlobal text={"Aquarium"} size={1} position={[-2,18,0]} />
        <Player/>
      </Physics>

  )
}

export default Experience
