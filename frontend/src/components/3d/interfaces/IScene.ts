import { IPokemon } from "./IPokemon";
export interface IScene {
    currentPokemon: IPokemon | null
    capturedPokemons: IPokemon[]
    onCapture: () => void
    onRelease: (id: number) => void
}