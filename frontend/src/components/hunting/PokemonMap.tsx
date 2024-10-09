import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Button } from "@/components/ui/button"
import Scenario from "../3d/Scenario"
import { IPokemon } from "../3d/interfaces/IPokemon"

interface PokemonMapProps {
  currentPokemon: IPokemon | null
  capturedPokemons: IPokemon[]
  onCapture: () => void
  onRelease: (id: number) => void
  onSearch: () => void
  isLoading: boolean
}

export function PokemonMap({ currentPokemon, capturedPokemons, onCapture, onRelease, onSearch, isLoading }: PokemonMapProps) {

  return (
    <div className="flex-grow relative rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ease-in-out cursor-cell">
      <Canvas>
        <Suspense fallback={null}>
          <Scenario
            currentPokemon={currentPokemon}
            capturedPokemons={capturedPokemons}
            onCapture={onCapture}
            onRelease={onRelease}
          />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-4 left-4 space-x-2">
        <Button
          onClick={onSearch}
          disabled={isLoading}
          className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded"
        >
          {isLoading ? "Procurando..." : "Recarregar"}
        </Button>
      </div>
    </div>
  )
}