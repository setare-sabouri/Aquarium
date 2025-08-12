import React from 'react'
import TextGlobal from '../Globals/TextGlobal'
import './Experience.module.scss'
import Bubbles from './Bubbles'
import Floor from '../Blocks/Floor'
import InstancedShapes from '../Globals/InstancedShapes'
const Experience = () => {
 
  return (
 <>
   <TextGlobal text={"Aquarium"} size={1} />
   <Floor/>
   <Bubbles/>
 </>

  )
}

export default Experience
