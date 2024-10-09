import { Test, TestingModule } from "@nestjs/testing";
import { CapturedPokemonsController } from "../../../src/captured-pokemons/controllers/captured-pokemons.controller";
import { CapturedPokemonService } from "../../../src/captured-pokemons/services/captured-pokemons.service";
import { JwtAuthGuard } from "../../../src/auth/jwtAndGuard/jwt-auth.guard";

describe("CapturedPokemonsController", () => {
  let controller: CapturedPokemonsController;
  let capturedPokemonServiceMock: jest.Mocked<CapturedPokemonService>;

  beforeEach(async () => {
    capturedPokemonServiceMock = {
      capturePokemon: jest.fn(),
      releasePokemon: jest.fn(),
      getUserCapturedPokemons: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CapturedPokemonsController],
      providers: [
        {
          provide: CapturedPokemonService,
          useValue: capturedPokemonServiceMock,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<CapturedPokemonsController>(
      CapturedPokemonsController,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("capturePokemon", () => {
    it("should call capturedPokemonService.capturePokemon with correct parameters", async () => {
      const req = { user: { userId: 1 } };
      const pokemonId = "25";
      await controller.capturePokemon(req, pokemonId);
      expect(capturedPokemonServiceMock.capturePokemon).toHaveBeenCalledWith(
        1,
        25,
      );
    });
  });

  describe("releasePokemon", () => {
    it("should call capturedPokemonService.releasePokemon with correct parameters", async () => {
      const req = { user: { userId: 1 } };
      const pokemonId = "25";
      await controller.releasePokemon(req, pokemonId);
      expect(capturedPokemonServiceMock.releasePokemon).toHaveBeenCalledWith(
        1,
        25,
      );
    });
  });

  describe("getUserCapturedPokemons", () => {
    it("should call capturedPokemonService.getUserCapturedPokemons with correct parameters", async () => {
      const req = { user: { userId: 1 } };
      await controller.getUserCapturedPokemons(req);
      expect(
        capturedPokemonServiceMock.getUserCapturedPokemons,
      ).toHaveBeenCalledWith(1);
    });
  });
});
