import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserFollow } from './entities/user-follow.entity';
import { FollowDto } from './dto/follow.dto';
import { ApiResponse } from 'src/common/http/ApiResponse';
import { NotFoundError } from 'rxjs';
import { RequestWithID } from 'src/common/interface/Request.type';

@Injectable()
export class UserFollowsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserFollow)
    private userFollowRepository: Repository<UserFollow>,
  ) {}

  async follow(followingUserID: number, req: RequestWithID) {
    const User = await this.userRepository.findOneBy({ ID: req.userID });
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
      where: { User: { ID: userID } },
    });

    const followingUsers = [];

    for (let i in follows) {
      followingUsers.push(follows[i].followingUser);
    }

    return new ApiResponse(followingUsers);
  }

  async getFollowings(userID) {
    const user = await this.userRepository.findOneBy({ ID: userID });

    if (!user) {
      throw new NotFoundException(`user with id ${userID} not found`);
    }

    const follows = await this.userFollowRepository.find({
      relations: ['followingUser', 'User'],
      where: { followingUser: { ID: userID } },
    });

    const followingUsers = [];

    for (let i in follows) {
      const { ID, username, email, role, createdAt, updatedAt } =
        follows[i].User;
      followingUsers.push({ ID, username, email, role, createdAt, updatedAt });
    }

    return new ApiResponse(followingUsers);
  }

  async unfollow(userID: number, req: RequestWithID) {
    const follow = await this.userFollowRepository.findOneBy({
      User: { ID: userID },
      followingUser: { ID: req.userID },
    });
    if (!follow) {
      throw new NotFoundException(`follow with id ${userID} not found`);
    }

    await this.userFollowRepository.delete(follow);

    return new ApiResponse({ success: true });
  }
}
