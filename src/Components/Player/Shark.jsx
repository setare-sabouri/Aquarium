import { useGLTF } from '@react-three/drei'

const Shark = () => {
    const Shark =useGLTF("./models/shark.glb")
    console.log(Shark)
  return (
    <>
    <primitive object={Shark.scene}></primitive>
    </>
  )
}

export default Shark
