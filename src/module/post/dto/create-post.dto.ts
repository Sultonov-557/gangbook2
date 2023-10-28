import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ default: 'string.jpg' })
  @IsUrl()
  @IsOptional()
  media: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ default: [1, 2, 3] })
  @IsNumber({ maxDecimalPlaces: 0 }, { each: true })
  users: number[];

  @ApiProperty({ default: [1, 2, 3] })
  @IsString({ each: true })
  hashtags: string[];
}
