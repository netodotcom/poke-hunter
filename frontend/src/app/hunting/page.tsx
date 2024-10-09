"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/hunting/Header"
import { PokemonInfo } from "@/components/hunting/PokemonInfo"
import { PokemonMap } from "@/components/hunting/PokemonMap"
import { CapturedPokemonList } from "@/components/hunting/CapturedPokemonList"
import { usePokemon } from "../hooks/usePokemon"
import { getMe } from "../utils/api"
import { IUser } from "../types/IUser"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [user, setUser] = useState<IUser | null>(null)
  const { currentPokemon, capturedPokemons, isLoading, handleFetchRandomPokemon, handleCapturePokemon, handleReleasePokemon } = usePokemon()
  const [showExplanation, setShowExplanation] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserAndPokemon = async () => {
      try {
        const userData = await getMe()
        setUser(userData)
        await handleFetchRandomPokemon()
      } catch (error) {
        console.error("Erro ao buscar usuário:", error)
        router.push("/")
      }
    }

    fetchUserAndPokemon()
  }, [])

  if (!user) {
    return <div className="h-screen flex items-center justify-center bg-stone-950 text-yellow-400">Carregando...</div>
  }

  return (
    <div className={`h-screen flex flex-col ${showExplanation ? "bg-stone-950" : "bg-yellow-400"} text-white transition-colors duration-500`}>
      <Header user={user} />
      <div className="flex-grow flex overflow-hidden">
        {showExplanation ? (
          <div className="flex flex-col justify-center items-center p-6 w-full">
            <h2 className="text-3xl font-bold mb-6 text-yellow-400">Bem-vindo ao Caçador de Pokémon</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-6xl">
              <Card className="bg-stone-800 border-yellow-400">
                <CardHeader>
                  <CardTitle className="text-yellow-400">1. Explore</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white">
                    Use o Mapa Pokémon para procurar Pokémon selvagens em diferentes áreas. Clique no botão "Procurar" para encontrar novos Pokémon.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-stone-800 border-yellow-400">
                <CardHeader>
                  <CardTitle className="text-yellow-400">2. Capture</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white">
                    Quando encontrar um Pokémon que goste, clique no botão "Capturar" para adicioná-lo à sua coleção. Cada captura é uma aventura única!
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-stone-800 border-yellow-400">
                <CardHeader>
                  <CardTitle className="text-yellow-400">3. Colecione</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white">
                    Veja seus Pokémon capturados na lista à direita. Você pode liberar os Pokémon que não quiser mais manter.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            <Button 
              variant="outline"
              size="lg"
              className="text-black border-stone-950 hover:bg-yellow-400 hover:text-stone-950"
              onClick={() => setShowExplanation(false)}
            >
              Começar a minha jornada
            </Button>
          </div>
        ) : (
          <main className="flex flex-col md:flex-row p-4 w-full">
            <PokemonInfo pokemon={currentPokemon} />
            <PokemonMap
              currentPokemon={currentPokemon}
              capturedPokemons={capturedPokemons}
              onCapture={handleCapturePokemon}
              onRelease={handleReleasePokemon}
              onSearch={handleFetchRandomPokemon}
              isLoading={isLoading}
            />
            <CapturedPokemonList
              pokemons={capturedPokemons}
              onRelease={handleReleasePokemon}
            />
          </main>
        )}
      </div>
    </div>
  )
}