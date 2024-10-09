import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPokemon } from "@/app/types/IPokemon";
import { getDominantColors } from "@/app/utils/getDominantColors";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

interface PokemonInfoProps {
  pokemon: IPokemon | null;
}

export function PokemonInfo({ pokemon }: PokemonInfoProps) {
  const [colors, setColors] = useState<string[]>([]);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    if (pokemon && pokemon.sprite) {
      const fetchColors = async () => {
        try {
          const dominantColors = await getDominantColors(pokemon.sprite);
          setColors(dominantColors);
        } catch (error) {
          console.error("Erro ao buscar a cor dominante", error);
        }
      };

      fetchColors();
    }
  }, [pokemon]);

  useEffect(() => {
    if (colors.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [colors]);

  const getIconByStatName = (statName: string) => {
    return <img src={`/images/${statName}.png`} alt={statName} className="w-8 h-8 bg-stone-200 rounded-full p-1" style={{ backgroundColor: colors[currentColorIndex]}}/>;
  }
  
  return (
    <Card className="w-64 rounded-lg flex flex-col mr-2 bg-stone-200 text-black">
      {pokemon && (
        <>
          <CardHeader>
            <CardTitle className="text-2xl text-center" style={{ color: "black" }}>{pokemon.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden p-4" >
            <ScrollArea className="h-[calc(100vh-200px)] pr-4">
              <div className="flex flex-col items-center">
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="mb-2 rounded-full p-1"
                  style={{ backgroundColor: colors[currentColorIndex] }}
                />
                <p className="text-sm mb-4 text-slate-200">{pokemon.description}</p>
                <div className="w-full">
                  {pokemon.stats.map((stat: any, index: number) => (
                    <div key={index}>
                      <div className="flex items-center justify-between py-2">
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-4 font-bold">
                          {getIconByStatName(stat.name)}
                          <h3 className="text-sm capitalize">{stat.name}</h3>
                        </div>
                      </div>
                        {Number(stat.value) >= 100 ? <p className="text-2xl text-red-500 text-bold">{stat.value}</p> : <p className="text-xl">{stat.value}</p>}
                      </div>
                      {index < pokemon.stats.length - 1 && <Separator style={{ backgroundColor: colors[currentColorIndex] }} className="my-3" />}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </>
      )}
    </Card>
  );
}

