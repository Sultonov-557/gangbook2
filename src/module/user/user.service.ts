import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { encrypt } from 'src/common/util/hash.util';
import { ApiResponse } from 'src/common/http/ApiResponse';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = encrypt(createUserDto.password);
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return new ApiResponse(true, 200);
  }

  async findAll() {
    return new ApiResponse(true, 200, await this.userRepository.find());
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { ID: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { email } = updateUserDto;
    if (updateUserDto.email) {
      const user = await this.userRepository.findOneBy({ email });
      if (user) {
        throw new BadRequestException(`user with email ${email} already exits`);
      }
    }
    this.userRepository.update({ ID: id }, updateUserDto);
    return { success: true };
  }

  async remove(id: number) {
    await this.userRepository.remove(
      await this.userRepository.findOneBy({ ID: id }),
    );

    return { success: true };
  }
}
