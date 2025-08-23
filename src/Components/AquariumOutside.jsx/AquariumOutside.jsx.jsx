import React from 'react'
import Fishes from './fishes'
import Turtle from './Turtle'

const AquariumOutside = () => {
  return (
    <>
      <Fishes position={[20, 1, -40]} />
      <Fishes position={[-20, 1, -70]} />
      <Fishes position={[-20, 1, -150]} />
      <Fishes position={[20, 1, -200]} />
      <Turtle position={[12,4,-20]} rotation={[0,Math.PI,Math.PI/4]}/>
    </>
  )
}

export default AquariumOutside
