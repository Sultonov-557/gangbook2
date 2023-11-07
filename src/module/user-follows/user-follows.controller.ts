import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserFollowsService } from './user-follows.service';
import { FollowDto } from './dto/follow.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RequestWithID } from 'src/common/interface/Request.type';

@Controller('api/follow')
export class UserFollowsController {
  constructor(private readonly userFollowsService: UserFollowsService) {}

  //@UseGuards(AuthGuard)
  @Post(':id')
  follow(@Param('id') followUserID: number, @Req() req: RequestWithID) {
    return this.userFollowsService.follow(followUserID, req);
  }

  @Get('/followers/:id')
  getFollowers(@Param('id') ID) {
    return this.userFollowsService.getFollowers(ID);
  }

  @Get('/followings/:id')
  getFollowings(@Param('id') ID) {
    return this.userFollowsService.getFollowings(ID);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  unfollow(@Param('id') ID, @Req() req: RequestWithID) {
    return this.userFollowsService.unfollow(ID, req);
  }
}
