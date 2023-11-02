import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserFollow } from './entities/user-follow.entity';
import { FollowDto } from './dto/follow.dto';
import { ApiResponse } from 'src/common/http/ApiResponse';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserFollowsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserFollow)
    private userFollowRepository: Repository<UserFollow>,
  ) {}

  async follow(body: FollowDto) {
    const { UserID, followingUserID } = body;

    const User = await this.userRepository.findOneBy({ ID: UserID });
    const followingUser = await this.userRepository.findOneBy({
      ID: followingUserID,
    });

    if (!followingUser || !User) {
      throw new NotFoundException('user not found');
    }

    const follow = this.userFollowRepository.create({
      followingUser,
      User,
    });

    await this.userFollowRepository.save(follow);

    return new ApiResponse({ success: true });
  }

  async getFollowers(userID) {
    const user = await this.userRepository.findOneBy({ ID: userID });

    if (!user) {
      throw new NotFoundException(`user with id ${userID} not found`);
    }

    const follows = await this.userFollowRepository.find({
      relations: ['followingUser', 'User'],
    });
    console.log(follows);

    return new ApiResponse(follows);
  }

  async unfollow(ID) {
    const follow = await this.userFollowRepository.findOneBy({ ID });
    if (!follow) {
      throw new NotFoundException(`follow with id ${ID} not found`);
    }

    await this.userFollowRepository.delete(follow);

    return new ApiResponse({ success: true });
  }
}
