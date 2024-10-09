import { Sky, Stars } from '@react-three/drei'
import Tree from './objects/Tree'
import Grass from './objects/Grass'
import Cloud from './objects/Cloud'

export default function Ambient() {
  return (
    <>
      <Sky sunPosition={[1000, 10, 100]} inclination={1} azimuth={0.25} />
      <Stars radius={100} depth={50} count={10000} factor={4} saturation={0} fade speed={1} />
      
      <ambientLight intensity={0.3} />
      <directionalLight position={[100, 10, 100]} intensity={1.5} castShadow />
      <Grass count={10000} />
      <Cloud count={75} />
      <Tree count={1000} />
      
      <fog attach="fog" args={['#151515', 10, 50]} />
    </>
  )
}