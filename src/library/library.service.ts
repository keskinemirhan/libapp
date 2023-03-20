import { Injectable, forwardRef, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { CreateBookDto } from "./dtos/create/create.book";
import { Book } from "./entities/book.entity";
import { Library } from "./entities/library.entity";

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Library) private libRepo: Repository<Library>,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService
  ) {}

  findAll() {
    return this.libRepo.find();
  }

  async createBook(createBookDto: CreateBookDto, user: User, library: Library) {
    const book = this.bookRepo.create(createBookDto);
    book.library = library;
    return await this.bookRepo.save(book);
  }

  async create(userId: number) {
    const library = this.libRepo.create({
      name: "My Library",
      user: await this.usersService.findOne(userId),
      books: [],
      categorization: [],
    });
    return await this.libRepo.save(library);
  }

  async findByUser(user: Partial<User>) {
    const currentUser = await this.usersService.findOne(user.id);
    const library = this.libRepo.findOne({
      where: {
        user: currentUser,
      },
      relations: {
        books: true,
      },
    });
    return library;
  }
}
