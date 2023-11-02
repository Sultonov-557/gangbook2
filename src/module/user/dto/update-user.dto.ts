import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsInt, IsNumber, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { UserRole } from 'src/common/enum/userRole.enum';
import { User } from '../entities/user.entity';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  username: string;
  
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsOptional()
  @IsStrongPassword({minSymbols:0,minLength:8,minUppercase:0})
  password: string;
  
  @ApiProperty()
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
