import { Injectable, forwardRef, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { Repository, TreeRepository } from "typeorm";
import { CreateBookDto } from "./dtos/create/create.book";
import { CreateCategoryDto } from "./dtos/create/create.category";
import { UpdateBookDto } from "./dtos/update/update.book.dto";
import { UpdateCategoryDto } from "./dtos/update/update.category.dto";
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

  //==================LIBRARY METHODS===================

  findAll() {
    return this.libRepo.find();
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

  async findByUser(user: any) {
    const currentUser = await this.usersService.findOne(user.userId);
    console.log(user.id);
    const library = await this.libRepo.findOne({
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

  //=====================================================

  //===================BOOK METHODS======================

  async createBook(createBookDto: CreateBookDto, library: Library) {
    const book = this.bookRepo.create({
      name: createBookDto.name,
      categories: [],
    });
    for (const cat of createBookDto.categories) {
      const category = await this.catRepo.findOne({
        where: {
          name: cat,
        },
      });

      book.categories.push(category);
    }
    book.library = library;
    return await this.bookRepo.save(book);
  }

  async updateBook(updateBookDto: UpdateBookDto, library: Library) {
    const book = await this.bookRepo.findOne({
      where: {
        id: updateBookDto.bookId,
      },
    });
    if (updateBookDto.categories) {
      const categories = [];

      for (let i = 0; i < updateBookDto.categories.length; i++) {
        const category = await (
          await this.getCategoriesArray(library.rootCategory)
        ).find((cat) => cat.name === updateBookDto.categories[i]);
        categories.push(category);
      }
      book.categories = categories;
    }

    if (book.name) {
      book.name = updateBookDto.bookName;
    }
    return await this.bookRepo.save(book);
  }

  async getBooks(library: Library) {
    return await this.bookRepo.find({
      where: {
        library,
      },
      relations: {
        categories: true,
      },
    });
  }

  async getBook(id: number, library: Library) {
    return await this.bookRepo.findOne({
      where: {
        id,
        library,
      },
    });
  }

  async deleteBook(id: number, library: Library) {
    return await this.bookRepo.delete({ id, library });
  }

  //=====================================================

  //===================CATEGORY METHODS==================

  async getCategory(id: number, library: Library) {
    const category = (await this.getCategoriesArray(library.rootCategory)).find(
      (cat) => cat.id === id
    );
    return await this.catRepo.findOne({ where: { id: category.id } });
  }

  async getCategoriesTree(library: Library) {
    const categorization = await this.catTreeRepo.findDescendantsTree(
      library.rootCategory
    );
    return categorization;
  }

  async getCategoriesArray(root: Category): Promise<Category[]> {
    const descendants = await this.catTreeRepo.findDescendants(root);
    descendants.shift();
    let result = [];
    if (descendants.length > 0) {
      for (const descendant of descendants) {
        result = descendants.concat(await this.getCategoriesArray(descendant));
      }
    }
    return result;
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

  async updateCategory(updateCategoryDto: UpdateCategoryDto, library: Library) {
    const category = (await this.getCategoriesArray(library.rootCategory)).find(
      (cat) => cat.id === updateCategoryDto.id
    );
    const topCategory = updateCategoryDto.topCategory;
    if (topCategory) {
      if (topCategory === "") {
        category.parent = library.rootCategory;
      } else {
        category.parent = await this.catRepo.findOne({
          where: { name: topCategory },
        });
      }
    }
    const name = updateCategoryDto.name;
    if (name) {
      category.name = name;
    }
    return await this.catRepo.save(category);
  }

  async deleteCategory(id: number, library: Library) {
    const categorie = (
      await this.getCategoriesArray(library.rootCategory)
    ).find((cat) => cat.id === id);
    return await this.catRepo.remove(categorie);
  }

  //=====================================================
}
