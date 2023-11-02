import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class FollowDto {
  @ApiProperty()
  @IsInt()
  followingUserID: number;

  @ApiProperty()
  @IsInt()
  UserID: number;
}
