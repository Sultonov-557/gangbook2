import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import * as hash from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { encrypt } from 'src/common/util/hash.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  async login(body:LoginAuthDto) {
    const { username, password } = body;

    if (!username || !password) {
      throw new BadRequestException('username or password not given');
    }

    const user: User = (
      await this.userRepository.find({
        where: { username },
      })
    )[0];

    if (!user || (await hash.compare(user.password, password))) {
      throw new BadRequestException('username or password wrong');
    }

    const token = jwt.sign({ ID: user.ID }, 'secret', { expiresIn: '200d' });

    user.token = encrypt(token);

    await this.userRepository.save(user);

    return { success: true, token };
  }

  async register(body:RegisterAuthDto) {
    const { username, password, email } = body;

    const userExists: boolean = await this.userRepository.exist({
      where: { username },
    });

    if (userExists) {
      throw new BadRequestException('username or emile already taken');
    }

    const hashedPassword = await hash.hash(password, 5);

    const user= this.userRepository.create({
      username,
      password: hashedPassword,
      email,
    });
    
    await this.userRepository.save(user)

    return { success: true };
  }

  async verify(body) {
    const { token } = body;

    try {
      const { ID } = await jwt.verify(token, 'secret');

      const userExists = await this.userRepository.exist({ where: { ID } });

      if (!userExists) {
        return { success: false };
      }

      return { success: true };
    } catch {
      return { success: false };
    }
  }
}
