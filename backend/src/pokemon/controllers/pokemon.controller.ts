import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PokemonDto } from '../dto/pokemon.dto';
import { PokemonService } from '../services/pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('random')
  async getRandomPokemon(): Promise<PokemonDto> {
    return this.pokemonService.getRandomPokemon();
  }

  @Get(':id')
  async getPokemonById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PokemonDto> {
    return this.pokemonService.getPokemonById(id);
  }
}
