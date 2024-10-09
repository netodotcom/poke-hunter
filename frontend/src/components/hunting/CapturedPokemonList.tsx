"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { IPokemon } from "@/app/types/IPokemon"
import { formatDate } from "@/app/utils/formatDate"
import { Separator } from "@/components/ui/separator"
import { ChevronUp, ChevronDown } from "lucide-react"
import { getDominantColors } from "@/app/utils/getDominantColors"

interface CapturedPokemonListProps {
  pokemons: IPokemon[]
  onRelease: (id: number) => void
}

export function CapturedPokemonList({ pokemons, onRelease }: CapturedPokemonListProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <Card className={isExpanded ? "w-80 flex flex-col bg-stone-950 text-white ml-2 relative overflow-hidden" : "ml-2 w-80 flex flex-col bg-stone-950 relative overflow-hidden"}>
      <div className="absolute inset-0 z-0">
        <img
          src="/images/ash.png"
          alt="Ash"
          className={`w-full h-full object-cover transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>
      <CardHeader className="flex flex-row items-center justify-between relative z-10">
        {<h2 className="text-2xl text-center text-white">Seus Pokemons</h2>}
        <Button
          variant="link"
          size="icon"
          onClick={toggleExpand}
          className="bg-stone-700 text-white hover:bg-stone-800"
          >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </CardHeader>
      <CardContent className="p-0 relative z-10">
        {isExpanded && (
          <ScrollArea className="h-[calc(100vh-200px)] pr-4 p-6">
            {pokemons.map((pokemon, index) => {
              return (
              <div key={pokemon.id}>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-4">
                    <img src={pokemon.sprite} alt={pokemon.name} className="w-16 h-16 rounded-full p-1" />
                    <div>
                      <h3 className="text-lg font-semibold capitalize">{pokemon.name}</h3>
                      <p className="text-sm text-slate-400">{formatDate(String(pokemon.capturedAt))}</p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onRelease(pokemon.id)}
                    className="bg-red-600 hover:bg-red-700 transition-colors"
                  >
                    X
                  </Button>
                </div>
                {index < pokemons.length - 1 && <Separator className="my-2 bg-slate-700" />}
              </div>
            )})}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}