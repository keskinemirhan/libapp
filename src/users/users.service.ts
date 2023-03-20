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
      throw new BadRequestException("email already exists");
    }

    const user = this.repo.create(createUserDto);
    await this.repo.save(user);
    user.library = await this.libraryService.create(user.id);
    return this.findOne(user.id);
  }

  findAll() {
    return this.repo.find();
  }

  find(user: Partial<User>) {
    return this.repo.find({ where: user });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException("non existing user");
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
      throw new NotFoundException("user not found");
    }
    return this.repo.remove(user);
  }
}
