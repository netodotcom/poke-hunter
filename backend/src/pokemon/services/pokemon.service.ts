import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { CacheService } from '../../shared/services/cache.service';
import { PokemonDto } from '../dto/pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(
    private httpService: HttpService,
    private cacheService: CacheService,
    private configService: ConfigService,
  ) {}

  async getRandomPokemon(): Promise<PokemonDto> {
    const pokemonCount = 140;
    const randomId = Math.floor(Math.random() * pokemonCount) + 1;
    return this.getPokemonById(randomId);
  }

  async getPokemonById(id: number): Promise<PokemonDto> {
    const cacheKey = `pokemon_${id}`;
    const cachedData = await this.cacheService.get<PokemonDto>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const apiUrl = this.configService.get<string>('POKEAPI_URL');
    const pokemonData = await lastValueFrom(
      this.httpService.get(`${apiUrl}/pokemon/${id}`).pipe(
        map((response) => ({
          id: response.data.id,
          name: response.data.name,
          sound: response.data.cries.latest,
          types: response.data.types.map((t) => t.type.name),
          stats: response.data.stats.map((s) => ({
            name: s.stat.name,
            value: s.base_stat,
          })),
          weight: response.data.weight,
          abilities: response.data.abilities.map((a) => a.ability.name),
          sprite:
            response.data.sprites.versions['generation-i']['red-blue']
              .front_transparent,
        })),
      ),
    );

    await this.cacheService.set(cacheKey, pokemonData);
    return pokemonData;
  }
}
