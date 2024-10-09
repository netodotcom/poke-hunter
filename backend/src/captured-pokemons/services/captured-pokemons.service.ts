import { Injectable } from '@nestjs/common';
import { PokemonRepository } from '../../pokemon/pokemon.repository';
import { PokemonService } from '../../pokemon/services/pokemon.service';

@Injectable()
export class CapturedPokemonService {
  constructor(
    private pokemonRepository: PokemonRepository,
    private pokemonService: PokemonService,
  ) {}

  async capturePokemon(userId: number, pokemonId: number) {
    return this.pokemonRepository.capturePokemon(userId, pokemonId);
  }

  async releasePokemon(userId: number, pokemonId: number) {
    return this.pokemonRepository.releasePokemon(userId, pokemonId);
  }

  async getUserCapturedPokemons(userId: number) {
    const capturedPokemons =
      await this.pokemonRepository.getUserCapturedPokemons(userId);

    return Promise.all(
      capturedPokemons.map(async (cp) => {
        const pokemonDetails = await this.pokemonService.getPokemonById(
          cp.pokemonId,
        );
        return {
          ...pokemonDetails,
          capturedAt: cp.capturedAt,
        };
      }),
    );
  }
}
