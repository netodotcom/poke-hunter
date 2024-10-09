import { Test, TestingModule } from '@nestjs/testing';
import { CapturedPokemonService } from '../../../src/captured-pokemons/services/captured-pokemons.service';
import { PokemonRepository } from '../../../src/pokemon/pokemon.repository';
import { PokemonService } from '../../../src/pokemon/services/pokemon.service';

describe('CapturedPokemonService', () => {
  let service: CapturedPokemonService;
  let pokemonRepositoryMock: jest.Mocked<PokemonRepository>;
  let pokemonServiceMock: jest.Mocked<PokemonService>;

  beforeEach(async () => {
    pokemonRepositoryMock = {
      capturePokemon: jest.fn(),
      releasePokemon: jest.fn(),
      getUserCapturedPokemons: jest.fn(),
    } as any;

    pokemonServiceMock = {
      getPokemonById: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CapturedPokemonService,
        { provide: PokemonRepository, useValue: pokemonRepositoryMock },
        { provide: PokemonService, useValue: pokemonServiceMock },
      ],
    }).compile();

    service = module.get<CapturedPokemonService>(CapturedPokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('capturePokemon', () => {
    it('should call pokemonRepository.capturePokemon with correct parameters', async () => {
      const userId = 1;
      const pokemonId = 25;
      await service.capturePokemon(userId, pokemonId);
      expect(pokemonRepositoryMock.capturePokemon).toHaveBeenCalledWith(
        userId,
        pokemonId,
      );
    });
  });

  describe('releasePokemon', () => {
    it('should call pokemonRepository.releasePokemon with correct parameters', async () => {
      const userId = 1;
      const pokemonId = 25;
      await service.releasePokemon(userId, pokemonId);
      expect(pokemonRepositoryMock.releasePokemon).toHaveBeenCalledWith(
        userId,
        pokemonId,
      );
    });
  });

  // describe('getUserCapturedPokemons', () => {
  //   it('should return captured pokemons with details', async () => {
  //     const userId = 1;
  //     const capturedPokemons = [
  //       { pokemonId: 25, capturedAt: new Date() },
  //       { pokemonId: 1, capturedAt: new Date() },
  //     ];
  //     const pokemonDetails = { id: 25, name: 'Pikachu' };

  //     pokemonRepositoryMock.getUserCapturedPokemons.mockResolvedValue(capturedPokemons);
  //     pokemonServiceMock.getPokemonById.mockResolvedValue(pokemonDetails);

  //     const result = await service.getUserCapturedPokemons(userId);

  //     expect(pokemonRepositoryMock.getUserCapturedPokemons).toHaveBeenCalledWith(userId);
  //     expect(pokemonServiceMock.getPokemonById).toHaveBeenCalledTimes(2);
  //     expect(result).toHaveLength(2);
  //     expect(result[0]).toEqual({ ...pokemonDetails, capturedAt: expect.any(Date) });
  //   });
  // });
});
