export interface IPokemon {
    id: number
    name: string
    sound: string
    sprite: string
    description: string
    stats: any,
    capturedAt?: string
}