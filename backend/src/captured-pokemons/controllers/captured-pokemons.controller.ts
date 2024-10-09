import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CapturedPokemonService } from '../services/captured-pokemons.service';
import { JwtAuthGuard } from '../../auth/jwtAndGuard/jwt-auth.guard';

@Controller('')
export class CapturedPokemonsController {
  constructor(
    private readonly capturedPokemonService: CapturedPokemonService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/capture/:pokemonId')
  async capturePokemon(@Request() req, @Param('pokemonId') pokemonId: string) {
    return this.capturedPokemonService.capturePokemon(
      req.user.userId,
      +pokemonId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/release/:pokemonId')
  async releasePokemon(@Request() req, @Param('pokemonId') pokemonId: string) {
    return this.capturedPokemonService.releasePokemon(
      req.user.userId,
      +pokemonId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my-pokemons')
  async getUserCapturedPokemons(@Request() req) {
    return this.capturedPokemonService.getUserCapturedPokemons(req.user.userId);
  }
}
