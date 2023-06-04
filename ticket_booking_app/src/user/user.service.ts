import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRequestDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ users: User[]; meta: any }> {
    const skip = (page - 1) * limit;

    const [users, totalCount] = await this.userRepository.findAndCount({
      select: ['id', 'name', 'email', 'phone'],
      skip,
      take: limit,
    });

    const meta = {
      totalCount,
      currentPage: page,
      perPage: limit,
      nextPage: page < Math.ceil(totalCount / limit) ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };

    return { users, meta };
  }

  async findOne(id: number): Promise<User | null> {
    try {
      const response = await this.userRepository.findOne({
        select: ['id', 'name', 'email', 'phone'],
        where: { id },
      });
      return response;
    } catch (err) {
      Logger.error(err);
      return null;
    }
  }

  async findWithEmail(email: string): Promise<User | null> {
    try {
      const response = await this.userRepository.findOne({
        where: { email: email },
      });
      return response;
    } catch (err) {
      Logger.error(err);
      return null;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User | string> {
    try {
      const newUser = await this.userRepository.create(createUserDto);
      const response = await this.userRepository.save(newUser);
      return response;
    } catch (err) {
      Logger.error(err);
      return 'Something went wrong';
    }
  }

  async update(
    updateUserRequestDto: UpdateUserRequestDto,
    id: number,
  ): Promise<any> {
    try {
      const response = await this.userRepository.update(
        id,
        updateUserRequestDto,
      );
      return response;
    } catch (err) {
      Logger.error(err);
      return 'Something went wrong';
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const response = await this.userRepository.delete(id);
      return response;
    } catch (err) {
      Logger.error(err);
      return `Something went wrong: ${err}`;
    }
  }
}
