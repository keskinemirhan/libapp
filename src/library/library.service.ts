import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { CreateBookDto } from "./dtos/create/create.book";
import { Library } from "./entities/library.entity";

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Library) private libRepo: Repository<Library>,
    private usersService: UsersService
  ) {}

  findAll() {
    return this.libRepo.find();
  }

  createBook(createBook: CreateBookDto, user: User, library: Library) {}

  create(userId: number) {}

  async findByUser(user: Partial<User>) {
    const currentUser = await this.usersService.findOne(user.id);
    const library = this.libRepo.findOne({
      where: {
        user: currentUser,
      },
    });
    return library;
  }
}
