import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../../../src/users/services/users.service";
import { UserRepository } from "../../../src/users/user.repository";
import { CreateUserDto } from "../../../src/users/dto/create-user.dto";
import * as bcrypt from "bcrypt";

jest.mock("bcrypt");

describe("UsersService", () => {
  let service: UsersService;
  let userRepositoryMock: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    userRepositoryMock = {
      create: jest.fn(),
      findOne: jest.fn(),
      findByEmail: jest.fn(),
      remove: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useValue: userRepositoryMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a new user with hashed password", async () => {
      const createUserDto: CreateUserDto = {
        email: "neto@neto.com",
        password: "senhasenha123",
        username: "neto",
      };
      const hashedPassword = "hashedPassword";
      const createdUser = { id: 1, ...createUserDto, password: hashedPassword };

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      userRepositoryMock.create.mockResolvedValue(createdUser);

      const result = await service.create(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith("senhasenha123", 10);
      expect(userRepositoryMock.create).toHaveBeenCalledWith({
        ...createUserDto,
        password: hashedPassword,
      });
      expect(result).toEqual(createdUser);
    });
  });

  describe("findOne", () => {
    it("should find a user by id", async () => {
      const userId = 1;
      const user = {
        id: userId,
        email: "neto@neto.com",
        username: "neto",
        password: "",
      };

      userRepositoryMock.findOne.mockResolvedValue(user);

      const result = await service.findOne(userId);

      expect(userRepositoryMock.findOne).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });
  });

  describe("findByEmail", () => {
    it("should find a user by email", async () => {
      const email = "neto@neto.com";
      const user = { id: 1, email, password: "", username: "" };

      userRepositoryMock.findByEmail.mockResolvedValue(user);

      const result = await service.findByEmail(email);

      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(user);
    });
  });

  describe("remove", () => {
    it("should remove a user by id", async () => {
      const userId = 1;
      const removedUser = {
        id: userId,
        email: "neto@neto.com",
        password: "",
        username: "",
      };

      userRepositoryMock.remove.mockResolvedValue(removedUser);

      const result = await service.remove(userId);

      expect(userRepositoryMock.remove).toHaveBeenCalledWith(userId);
      expect(result).toEqual(removedUser);
    });
  });
});
