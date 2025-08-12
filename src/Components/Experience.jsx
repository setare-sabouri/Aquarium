import React from 'react'
import TextGlobal from '../Globals/TextGlobal'
import './Experience.module.scss'
const Experience = () => {
 
  return (
 <>
   <TextGlobal text={"Aquarium"} size={1} />
   <mesh position={[0,-1,0]} receiveShadow>
    <boxGeometry args={[9,0.5,5]} />
    <meshStandardMaterial/>
   </mesh>
 </>

  )
}

export default Experience
