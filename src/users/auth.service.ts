import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import {
  UserException,
  UserExceptionCodes,
} from "./exceptions/user.exceptions";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}
  login(loginUser: any) {
    const token = this.jwtService.sign({
      email: loginUser.email,
      sub: loginUser.id,
    });
    return { access_token: token };
  }
  async validateUser(email: string, password: string) {
    const [user] = await this.usersService.find({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signup(createUserDto: CreateUserDto) {
    if ((await this.usersService.find({ email: createUserDto.email })).at(0)) {
      throw new UserException(UserExceptionCodes.EMAIL_IN_USE);
    }
    if (
      (await this.usersService.find({ username: createUserDto.username })).at(0)
    ) {
      throw new UserException(UserExceptionCodes.USERNAME_IN_USE);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    console.log(hashedPassword);

    const user = await this.usersService.create(createUserDto);
    return;
  }
}
