import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  public text: string;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 })
  public postID: number;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 })
  public userID: number;
}
