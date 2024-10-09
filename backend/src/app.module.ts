import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { PokemonModule } from './pokemon/pokemon.module';
import { CapturedPokemonModule } from './captured-pokemons/captured-pokemons.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    PokemonModule,
    CapturedPokemonModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
