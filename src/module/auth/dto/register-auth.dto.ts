import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class RegisterAuthDto {
    @IsString()
    username: string;
  
    @IsEmail()
    email: string;

    @IsStrongPassword({minLength:8,minSymbols:0,minUppercase:0})
    password: string;
  }
  
