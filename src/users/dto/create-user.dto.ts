import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @MaxLength(320)
  @MinLength(6)
  email: string;

  @IsString()
  @MaxLength(256)
  @MinLength(4)
  username: string;

  @IsString()
  @MaxLength(256)
  @MinLength(8)
  password: string;
}
