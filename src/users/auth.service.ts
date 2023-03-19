import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UsersService } from "./users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async login(loginUser: LoginUserDto) {
    const [user] = await this.usersService.find(loginUser);
    if (!user) {
      throw new BadRequestException("wrong credentials");
    }
    return user.id;
  }

  async signup(createUserDto: CreateUserDto) {
    if (await this.usersService.find({ email: createUserDto.email })) {
      throw new BadRequestException("this email already exists");
    }
    if (await this.usersService.find({ username: createUserDto.username })) {
      throw new BadRequestException("this username already exists");
    }
    const user = await this.usersService.create(createUserDto);
    return user.id;
  }
}
