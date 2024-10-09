"use client"

import { useLoader } from '@react-three/fiber'
import { Plane, Billboard } from '@react-three/drei'
import * as THREE from 'three'

export default function PokemonModel({ pokemon, onClick }: any) {
  const texture = useLoader(THREE.TextureLoader, pokemon.sprite)
  
  return (
    <group position={[5,0,10]} onClick={onClick}>
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <Plane args={[1, 1]} position={[5,0,10]}>
          <meshBasicMaterial map={texture} transparent={true} side={THREE.FrontSide} />
        </Plane>
      </Billboard>
    </group>
  )
}