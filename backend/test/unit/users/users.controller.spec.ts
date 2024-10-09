import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "../../../src/users/controllers/users.controller";
import { UsersService } from "../../../src/users/services/users.service";
import { CreateUserDto } from "../../../src/users/dto/create-user.dto";
import { JwtAuthGuard } from "../../../src/auth/jwtAndGuard/jwt-auth.guard";

describe("UsersController", () => {
  let controller: UsersController;
  let usersServiceMock: jest.Mocked<UsersService>;

  beforeEach(async () => {
    usersServiceMock = {
      create: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const createUserDto: CreateUserDto = {
        email: "neto@neto.com",
        password: "password123",
        username: "neto",
      };
      const createdUser = { id: 1, ...createUserDto };

      usersServiceMock.create.mockResolvedValue(createdUser);

      const result = await controller.create(createUserDto);

      expect(usersServiceMock.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(createdUser);
    });
  });

  describe("getMe", () => {
    it("should return the authenticated user", async () => {
      const req = { user: { id: 1, email: "neto@neto.com" } };

      const result = controller.getMe(req);

      expect(result).toEqual(req.user);
    });
  });

  describe("findOne", () => {
    it("should find a user by id", async () => {
      const userId = "1";
      const user = {
        id: 1,
        email: "neto@neto.com",
        username: "neto",
        password: "123",
      };

      usersServiceMock.findOne.mockResolvedValue(user);

      const result = await controller.findOne(userId);

      expect(usersServiceMock.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(user);
    });
  });

  describe("remove", () => {
    it("should remove a user by id", async () => {
      const userId = "1";
      const removedUser = {
        id: 1,
        email: "neto@neto.com",
        username: "neto",
        password: "123",
      };

      usersServiceMock.remove.mockResolvedValue(removedUser);

      const result = await controller.remove(userId);

      expect(usersServiceMock.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(removedUser);
    });
  });
});
