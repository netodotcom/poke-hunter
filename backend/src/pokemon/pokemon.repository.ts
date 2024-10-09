import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';

@Injectable()
export class PokemonRepository {
  constructor(private prisma: PrismaService) {}

  async capturePokemon(userId: number, pokemonId: number) {
    return this.prisma.capturedPokemon.create({
      data: {
        userId,
        pokemonId,
      },
    });
  }

  async releasePokemon(userId: number, pokemonId: number) {
    return this.prisma.capturedPokemon.delete({
      where: {
        userId_pokemonId: {
          userId,
          pokemonId,
        },
      },
    });
  }

  async getUserCapturedPokemons(userId: number) {
    return this.prisma.capturedPokemon.findMany({
      where: {
        userId,
      },
    });
  }
}
