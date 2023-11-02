import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as hash from 'bcrypt';
import { User } from './entities/user.entity';
import { encrypt } from 'src/common/util/hash.util';
import { ApiResponse } from 'src/common/http/ApiResponse';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async search(query) {
    const users = await this.userRepository.find({
      where: { username: Like(`%${query}%`) },
    });

    return new ApiResponse(users);
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = encrypt(createUserDto.password);
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return new ApiResponse(true);
  }

  async findAll() {
    return new ApiResponse(await this.userRepository.find());
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { ID: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let { email,password,role,username } = updateUserDto;
    if (email) {
      const user = await this.userRepository.findOneBy({ email });
      if (user) {
        throw new BadRequestException(`user with email ${email} already exits`);
      }
    }

    if(password){
      password = await hash.hash(password, 5);
    }

    await this.userRepository.update({ ID: id }, {email,password,role,username});
    return { success: true };
  }

  async remove(id: number) {
    await this.userRepository.remove(
      await this.userRepository.findOneBy({ ID: id }),
    );

    return { success: true };
  }
}
