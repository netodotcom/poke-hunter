import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { fetchRandomPokemon, capturePokemon, releasePokemon, getUserCapturedPokemons } from "../utils/api"
import toast from "react-hot-toast"
import { IPokemon } from "../types/IPokemon"

export function usePokemon() {
  const [currentPokemon, setCurrentPokemon] = useState<IPokemon | null>(null)
  const [capturedPokemons, setCapturedPokemons] = useState<IPokemon[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await getUserCapturedPokemons();
        if (response) {
          setCapturedPokemons(response);
        } else {
          toast.error("Falha ao buscar pokemons capturados.")
          console.error(response.status);
        }
      }catch(error) {
        router.push("/");
      }
    }
    fetchPokemons();
  }, [router])

  const handleFetchRandomPokemon = async () => {
    setIsLoading(true)
    try {
      const pokemon = await fetchRandomPokemon()
      setCurrentPokemon(pokemon)
    } catch (error) {
      console.error(error)
      toast.error("Erro ao buscar um pokemon aleatório.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCapturePokemon = async () => {
    if (currentPokemon) {
      try {
        const audio = new Audio(currentPokemon.sound)

        await new Promise<void>((resolve, reject) => {
          audio.volume = 0.2
          audio.play().then(() => {
            audio.onended = () => {
              resolve()
            }
          }).catch((error) => {
            console.error("Erro ao reproduzir som:", error)
            resolve()
          })
        })

        const captureChance = Math.random() * 100

        if (captureChance <= 80) {
          await capturePokemon(currentPokemon.id)
          const updatedPokemons = await getUserCapturedPokemons()
          setCapturedPokemons(updatedPokemons)
          setCurrentPokemon(null)

          toast.success(`${currentPokemon.name} capturado!`)
          handleFetchRandomPokemon();
        } else {
          toast.error(`${currentPokemon.name} escapou!`)
        }
      } catch (error) {
        console.error(error)
        toast.error(`${currentPokemon.name} escapou :()`)
      }
    }
  }

  const handleReleasePokemon = async (id: number) => {
    try {
      await releasePokemon(id)
      const updatedPokemons = await getUserCapturedPokemons()
      setCapturedPokemons(updatedPokemons)
      toast.success("Pokemon solto!")
    } catch (error) {
      console.error("Erro ao soltar o Pokemon:", error)
      toast.error("Erro ao soltar o Pokemon")
    }
  }

  return {
    currentPokemon,
    capturedPokemons,
    isLoading,
    handleFetchRandomPokemon,
    handleCapturePokemon,
    handleReleasePokemon
  }
}