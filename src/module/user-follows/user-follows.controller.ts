import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserFollowsService } from './user-follows.service';
import { FollowDto } from './dto/follow.dto';

@Controller('api/follow')
export class UserFollowsController {
  constructor(private readonly userFollowsService: UserFollowsService) {}

  @Post()
  follow(@Body() body: FollowDto) {
    return this.userFollowsService.follow(body);
  }

  @Get('/followers/:id')
  getFollowers(@Param('id') ID) {
    return this.userFollowsService.getFollowers(ID);
  }

  @Get('/followings/:id')
  getFollowings(@Param('id') ID) {
    return this.userFollowsService.getFollowings(ID);
  }

  @Delete('/:id')
  unfollow(@Param('id') ID) {
    return this.userFollowsService.unfollow(ID);
  }
}