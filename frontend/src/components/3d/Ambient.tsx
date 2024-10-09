import { Sky, Cloud, Stars } from '@react-three/drei'
import Tree from './objects/Tree'
import Grass from './objects/Grass'

export default function Ambient() {
  return (
    <>
      <Sky sunPosition={[1000, 10, 100]} inclination={1} azimuth={0.25} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <ambientLight intensity={0.3} />
      <directionalLight position={[100, 10, 100]} intensity={1.5} castShadow />
      
      <Cloud position={[-49, 2, -5]} speed={0.2} opacity={0.5} />
      <Cloud position={[40, 3, -6]} speed={0.2} opacity={0.5} />
      <Cloud position={[120, 4, -10]} speed={0.2} opacity={0.5} />
      
      <Grass count={10000} />
      <Tree count={1000} />
      
      <fog attach="fog" args={['#020', 0, 30]} />
    </>
  )
}