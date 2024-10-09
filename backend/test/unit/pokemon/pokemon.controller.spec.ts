import { Test, TestingModule } from "@nestjs/testing";
import { PokemonController } from "../../../src/pokemon/controllers/pokemon.controller";
import { PokemonService } from "../../../src/pokemon/services/pokemon.service";
import { PokemonDto } from "../../../src/pokemon/dto/pokemon.dto";

describe("PokemonController", () => {
  let controller: PokemonController;
  let pokemonServiceMock: jest.Mocked<PokemonService>;

  beforeEach(async () => {
    pokemonServiceMock = {
      getRandomPokemon: jest.fn(),
      getPokemonById: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [{ provide: PokemonService, useValue: pokemonServiceMock }],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getRandomPokemon", () => {
    it("should return a random pokemon", async () => {
      const mockPokemon: PokemonDto = {
        id: 25,
        name: "pikachu",
        sound: "pikachu.mp3",
        types: ["electric"],
        stats: [{ name: "hp", value: 35 }],
        weight: 60,
        abilities: ["static"],
        sprite: "pikachu.png",
      };

      pokemonServiceMock.getRandomPokemon.mockResolvedValue(mockPokemon);

      const result = await controller.getRandomPokemon();
      expect(result).toEqual(mockPokemon);
      expect(pokemonServiceMock.getRandomPokemon).toHaveBeenCalled();
    });
  });

  describe("getPokemonById", () => {
    it("should return a pokemon by id", async () => {
      const mockPokemon: PokemonDto = {
        id: 25,
        name: "pikachu",
        sound: "pikachu.mp3",
        types: ["electric"],
        stats: [{ name: "hp", value: 35 }],
        weight: 60,
        abilities: ["static"],
        sprite: "pikachu.png",
      };

      pokemonServiceMock.getPokemonById.mockResolvedValue(mockPokemon);

      const result = await controller.getPokemonById(25);
      expect(result).toEqual(mockPokemon);
      expect(pokemonServiceMock.getPokemonById).toHaveBeenCalledWith(25);
    });
  });
});
