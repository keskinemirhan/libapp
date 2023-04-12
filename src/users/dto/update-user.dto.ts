import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsString, IsEmail, MaxLength, MinLength } from "class-validator";
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  @MaxLength(320)
  @MinLength(6)
  email?: string;

  @IsString()
  @MaxLength(256)
  @MinLength(4)
  username: string;

  @IsString()
  @MaxLength(256)
  @MinLength(8)
  password?: string;
}
