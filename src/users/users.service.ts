import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LibraryService } from "src/library/library.service";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import {
  UserException,
  UserExceptionCodes,
} from "./exceptions/user.exceptions";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @Inject(forwardRef(() => LibraryService))
    private libraryService: LibraryService
  ) {}

  //temporary methods not complete

  // probably has better much better alternative method for this
  async create(createUserDto: CreateUserDto) {
    if (
      await this.repo.findOne({
        where: {
          email: createUserDto.email,
        },
      })
    ) {
      throw new UserException(UserExceptionCodes.EMAIL_IN_USE);
    }
    if (
      await this.repo.findOne({
        where: {
          username: createUserDto.username,
        },
      })
    ) {
      throw new UserException(UserExceptionCodes.USERNAME_IN_USE);
    }

    const user = this.repo.create(createUserDto);
    await this.repo.save(user);
    user.library = await this.libraryService.createLibrary(user.id);
    return;
  }

  findAll() {
    return this.repo.find();
  }

  find(user: Partial<User>) {
    return this.repo.find({ where: user });
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (!user) throw new UserException(UserExceptionCodes.USER_NOT_FOUND);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new UserException(UserExceptionCodes.USER_NOT_FOUND);
    }
    Object.assign(user, updateUserDto);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new UserException(UserExceptionCodes.USER_NOT_FOUND);
    }
    return this.repo.remove(user);
  }
}
