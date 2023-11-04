import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import * as hash from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { encrypt } from 'src/common/util/hash.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwt: JwtService,
  ) {}

  async login(body: LoginAuthDto) {
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

    const token = this.jwt.sign({ ID: user.ID });

    user.token = encrypt(token);

    await this.userRepository.save(user);

    return { success: true, token };
  }

  async register(body: RegisterAuthDto) {
    const { username, password, email } = body;

    const userExists: boolean = await this.userRepository.exist({
      where: { username },
    });

    if (userExists) {
      throw new BadRequestException('username or emile already taken');
    }

    const hashedPassword = await hash.hash(password, 5);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
    });

    await this.userRepository.save(user);

    return { success: true };
  }
}
