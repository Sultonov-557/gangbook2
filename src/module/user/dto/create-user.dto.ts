import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';
import { UserRole } from 'src/common/enum/userRole.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  username: string;
  
  @ApiProperty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsStrongPassword({minSymbols:0,minLength:8,minUppercase:0})
  password: string;
  
  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;
}
