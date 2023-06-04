import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const mockUserService = {
  create: jest.fn((dto) => {
    const resp = {
      id: Date.now(),
      ...dto,
      access_token: 'qwertyuiop.zxcvbnm.asdfghjkl',
    };
    delete resp.password;
    return resp;
  }),
  update: jest.fn((dto, id) => {
    return {
      id: id,
      name: dto.name,
      email: 'ankit@example.com',
      phone: '0123456789',
    };
  }),
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = {
      name: 'Ankit',
      email: 'ankit@example.com',
      phone: '0123456789',
      password: 'Abcd123#',
    };

    const createdUser = await controller.createUser(createUserDto);
    expect(createdUser).toEqual({
      id: expect.any(Number),
      name: createUserDto.name,
      email: createUserDto.email,
      phone: createUserDto.phone,
      access_token: expect.any(String),
    });

    expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should update a user', async () => {
    const updateUserDto = {
      name: 'Ankit Kumar',
    };
    const id = 1;

    const updatedUser = await controller.updateUser(updateUserDto, id);
    expect(updatedUser).toEqual({
      id: id,
      name: updateUserDto.name,
      email: expect.any(String),
      phone: expect.any(String),
    });

    expect(mockUserService.update).toHaveBeenCalledWith(updateUserDto, id);
  });
});
