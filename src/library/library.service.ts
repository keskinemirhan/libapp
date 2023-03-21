import { Injectable, forwardRef, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { Repository, TreeRepository } from "typeorm";
import { CreateBookDto } from "./dtos/create/create.book";
import { CreateCategoryDto } from "./dtos/create/create.category";
import { Book } from "./entities/book.entity";
import { Category } from "./entities/category.entity";
import { Library } from "./entities/library.entity";

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Category) private catRepo: Repository<Category>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Category) private catTreeRepo: TreeRepository<Category>,
    @InjectRepository(Library) private libRepo: Repository<Library>,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService
  ) {}

  findAll() {
    return this.libRepo.find();
  }

  async findCategory(id: number) {
    return await this.catRepo.findOne({
      where: {
        id,
      },
    });
  }

  async createBook(createBookDto: CreateBookDto, library: Library) {
    const book = this.bookRepo.create(createBookDto);
    book.library = library;
    return await this.bookRepo.save(book);
  }

  async getCategories(library: Library) {
    const categorization = await this.catTreeRepo.findDescendantsTree(
      library.rootCategory
    );
    return categorization;
  }

  async createCategory(createCategoryDto: CreateCategoryDto, library: Library) {
    const category = this.catRepo.create({ name: createCategoryDto.name });
    if (createCategoryDto.topCategory === "") {
      category.parent = library.rootCategory;
    } else
      category.parent = await this.catRepo.findOne({
        where: {
          name: createCategoryDto.topCategory,
        },
      });
    return await this.catRepo.save(category);
  }

  async createLibrary(userId: number) {
    const defaultLibrary: Partial<Library> = {
      name: "My Library",
      user: await this.usersService.findOne(userId),
      books: [],
    };

    const library = this.libRepo.create(defaultLibrary);
    const categorization = this.catRepo.create({
      name: "root",
    });
    console.log(categorization);
    await this.catRepo.save(categorization);
    library.rootCategory = categorization;
    await this.libRepo.save(library);
    return await library;
  }

  async findByUser(user: Partial<User>) {
    const currentUser = await this.usersService.findOne(user.id);
    const library = this.libRepo.findOne({
      where: {
        user: currentUser,
      },
      relations: {
        books: true,
        rootCategory: true,
      },
    });
    return library;
  }
}
