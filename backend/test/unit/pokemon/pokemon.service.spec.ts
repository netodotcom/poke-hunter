import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { PokemonService } from '../../../src/pokemon/services/pokemon.service';
import { CacheService } from '../../../src/shared/services/cache.service';
import { PokemonDto } from '../../../src/pokemon/dto/pokemon.dto';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpServiceMock: jest.Mocked<HttpService>;
  let cacheServiceMock: jest.Mocked<CacheService>;
  let configServiceMock: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    httpServiceMock = {
      get: jest.fn(),
    } as any;

    cacheServiceMock = {
      get: jest.fn(),
      set: jest.fn(),
    } as any;

    configServiceMock = {
      get: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        { provide: HttpService, useValue: httpServiceMock },
        { provide: CacheService, useValue: cacheServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRandomPokemon', () => {
    it('should return a random pokemon', async () => {
      const mockPokemon: PokemonDto = {
        id: 25,
        name: 'pikachu',
        sound: 'pikachu.mp3',
        types: ['electric'],
        stats: [{ name: 'hp', value: 35 }],
        weight: 60,
        abilities: ['static'],
        sprite: 'pikachu.png',
      };

      jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
      jest.spyOn(service, 'getPokemonById').mockResolvedValue(mockPokemon);

      const result = await service.getRandomPokemon();
      expect(result).toEqual(mockPokemon);
      expect(service.getPokemonById).toHaveBeenCalledWith(71);
    });
  });

  describe('getPokemonById', () => {
    const mockPokemon: PokemonDto = {
      id: 25,
      name: 'pikachu',
      sound: 'pikachu.mp3',
      types: ['electric'],
      stats: [{ name: 'hp', value: 35 }],
      weight: 60,
      abilities: ['static'],
      sprite: 'pikachu.png',
    };

    it('should return cached pokemon if available', async () => {
      cacheServiceMock.get.mockResolvedValue(mockPokemon);

      const result = await service.getPokemonById(25);
      expect(result).toEqual(mockPokemon);
      expect(cacheServiceMock.get).toHaveBeenCalledWith('pokemon_25');
      expect(httpServiceMock.get).not.toHaveBeenCalled();
    });

    it('should fetch pokemon from API if not in cache', async () => {
      cacheServiceMock.get.mockResolvedValue(null);
      configServiceMock.get.mockReturnValue('https://pokeapi.co/api/v2');
      httpServiceMock.get.mockReturnValue(
        of({
          data: {
            id: 25,
            name: 'pikachu',
            cries: { latest: 'pikachu.mp3' },
            types: [{ type: { name: 'electric' } }],
            stats: [{ stat: { name: 'hp' }, base_stat: 35 }],
            weight: 60,
            abilities: [{ ability: { name: 'static' } }],
            sprites: {
              versions: {
                'generation-i': {
                  'red-blue': {
                    front_transparent: 'pikachu.png',
                  },
                },
              },
            },
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: undefined,
        }),
      );

      const result = await service.getPokemonById(25);
      expect(result).toEqual(mockPokemon);
      expect(cacheServiceMock.get).toHaveBeenCalledWith('pokemon_25');
      expect(httpServiceMock.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/25',
      );
      expect(cacheServiceMock.set).toHaveBeenCalledWith(
        'pokemon_25',
        mockPokemon,
      );
    });
  });
});
