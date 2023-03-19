import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

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
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
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
