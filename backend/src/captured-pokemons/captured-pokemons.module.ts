import { Module } from '@nestjs/common';
import { CapturedPokemonService } from './services/captured-pokemons.service';
import { CapturedPokemonsController } from './controllers/captured-pokemons.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PokemonService } from '../pokemon/services/pokemon.service';
import { HttpModule } from '@nestjs/axios';
import { PokemonRepository } from 'src/pokemon/pokemon.repository';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CacheService } from 'src/shared/services/cache.service';

@Module({
  imports: [HttpModule, PokemonModule],
  controllers: [CapturedPokemonsController],
  providers: [
    CapturedPokemonService,
    PokemonRepository,
    PrismaService,
    PokemonService,
    CacheService,
  ],
})
export class CapturedPokemonModule {}
