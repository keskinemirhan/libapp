import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "./jwt.guard";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { User } from "./entities/user.entity";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user: User) => {
      return {
        email: user.email,
        username: user.username,
        library: user.library,
      };
    });
  }

  @UseGuards(AuthGuard("local"))
  @Post("login")
  login(@Request() request) {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Request() req: any) {
    const { password, id, ...result } = await this.usersService.findOne(
      req.user.userId
    );
    return result;
  }

  @Get(":id")
  async findOne(@Param("id") userid: string) {
    const { password, id, ...result } = await this.usersService.findOne(
      +userid
    );
    return result;
  }

  @Patch(":id")
  async update(
    @Param("id") userid: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const { password, id, ...result } = await this.usersService.update(
      +userid,
      updateUserDto
    );
    return result;
  }

  @Delete(":id")
  async remove(@Param("id") userid: string) {
    const { password, id, ...result } = await this.usersService.remove(+userid);
    return result;
  }
}
