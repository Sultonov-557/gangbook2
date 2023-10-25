import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';
import { UserRole } from 'src/common/enum/userRole.enum';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
