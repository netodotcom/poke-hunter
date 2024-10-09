"use client"

import * as THREE from "three"
import { useEffect, useRef, useState } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Text, Html } from "@react-three/drei"
import PokemonModel from "./PokemonModel"
import Ambient from "./Ambient"

export default function Scenario({ currentPokemon, onCapture }: any) {
  const { camera } = useThree()
  const controlsRef = useRef<any>()
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 5, z: 10 })

  useEffect(() => {

  })

  useEffect(() => {
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
  }, [camera, cameraPosition])

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.target.y = Math.max(controlsRef.current.target.y, 0)
      camera.position.y = Math.max(camera.position.y, 0.5)
      
      const maxDistance = 20
      const currentDistance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0))
      if (currentDistance > maxDistance) {
        camera.position.setLength(maxDistance)
      }
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault fov={75} near={0.1} far={900} />
      <OrbitControls ref={controlsRef} maxPolarAngle={Math.PI / 2 - 0.1} />
      
      <Ambient />
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#4caf50" />
      </mesh>

      {currentPokemon && (
        <PokemonModel
          pokemon={currentPokemon}
          position={[0, 0.5, 0]}
          onClick={onCapture}
        />
      )}
    </>
  )
}