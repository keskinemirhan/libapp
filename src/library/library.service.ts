import { Injectable, forwardRef, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { Repository, TreeRepository } from "typeorm";
import { CreateBookDto } from "./dtos/create/create.book";
import { CreateCategoryDto } from "./dtos/create/create.category";
import { CreateNoteDto } from "./dtos/create/create.note.dto";
import { UpdateBookDto } from "./dtos/update/update.book.dto";
import { UpdateCategoryDto } from "./dtos/update/update.category.dto";
import { UpdateNoteDto } from "./dtos/update/update.note.dto";
import { Book } from "./entities/book.entity";
import { Category } from "./entities/category.entity";
import { Library } from "./entities/library.entity";
import { Note } from "./entities/note.entity";

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Category) private catRepo: Repository<Category>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Category) private catTreeRepo: TreeRepository<Category>,
    @InjectRepository(Library) private libRepo: Repository<Library>,
    @InjectRepository(Note) private noteRepo: Repository<Note>,
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
          id: cat,
        },
      });

      book.categories.push(category);
    }
    book.library = library;
    const savedBook = await this.bookRepo.save(book);
    return this.bookRepo.findOne({
      where: {
        id: savedBook.id,
      },
      relations: {
        categories: true,
      },
    });
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
        ).find((cat) => cat.id === updateBookDto.categories[i]);
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
      relations: {
        categories: true,
      },
    });
  }

  async deleteBook(id: number, library: Library) {
    const deleted = await this.bookRepo.findOne({
      where: {
        id,
      },
      relations: {
        categories: true,
      },
    });
    await this.bookRepo.delete({ id, library });
    return deleted;
  }

  //=====================================================

  //===================CATEGORY METHODS==================

  async getCategory(id: number, library: Library) {
    const category = (await this.getCategoriesArray(library.rootCategory)).find(
      (cat) => cat.id == id
    );
    return await this.catRepo.findOne({
      where: { id: category.id },
      relations: {
        children: true,
        parent: true,
      },
    });
  }

  async getCategoriesTree(library: Library) {
    const categorization = await this.catTreeRepo.findDescendantsTree(
      library.rootCategory
    );
    return categorization;
  }

  async getCategoriesArray(root: Category): Promise<Category[]> {
    const descendants = await this.catTreeRepo.findDescendants(root, {
      relations: ["parent"],
    });
    descendants.shift();
    let result = [];
    if (descendants.length > 0) {
      for (const descendant of descendants) {
        result = descendants.concat(await this.getCategoriesArray(descendant));
      }
    }
    return result;
  }

  async getMainCategoriesArray(library: Library) {
    return await this.catTreeRepo.findDescendantsTree(library.rootCategory, {
      depth: 1,
    });
  }

  async createCategory(createCategoryDto: CreateCategoryDto, library: Library) {
    const category = this.catRepo.create({ name: createCategoryDto.name });
    if (createCategoryDto.topCategory === 0) {
      category.parent = library.rootCategory;
    } else
      category.parent = await this.catRepo.findOne({
        where: {
          id: createCategoryDto.topCategory,
        },
      });
    return await this.catRepo.save(category);
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto, library: Library) {
    const category = (await this.getCategoriesArray(library.rootCategory)).find(
      (cat) => cat.id == updateCategoryDto.id
    );
    const topCategory = updateCategoryDto.topCategory;
    if (topCategory) {
      if (topCategory === 0) {
        category.parent = library.rootCategory;
      } else {
        category.parent = await this.catRepo.findOne({
          where: { id: topCategory },
        });
      }
    }
    const name = updateCategoryDto.name;
    if (name) {
      category.name = name;
    }
    const savedCat = await this.catRepo.save(category);
    return await this.catRepo.findOne({
      where: {
        id: savedCat.id,
      },
    });
  }

  async deleteCategory(id: number, library: Library) {
    const categorie = (
      await this.getCategoriesArray(library.rootCategory)
    ).find((cat) => cat.id == id);

    return await this.catRepo.remove(categorie);
  }

  //=====================================================

  //===================== NOTE METHODS ==================

  async findAllNote(library: Library) {
    return await this.noteRepo.find({
      where: { library },
      relations: {
        book: true,
      },
    });
  }

  async createNote(createNoteDto: CreateNoteDto, library: Library) {
    const book = await this.bookRepo.findOne({
      where: {
        id: createNoteDto.bookId,
      },
    });
    const note = this.noteRepo.create(createNoteDto);
    note.library = library;
    note.book = book;
    return await this.noteRepo.save(note);
  }

  async findNotesByBook(id: number, library: Library) {
    const book = await this.bookRepo.findOne({
      where: {
        id,
      },
    });
    return await this.noteRepo.find({
      where: {
        library,
        book,
      },
    });
  }

  async deleteNote(id: number, library: Library) {
    const note = await this.noteRepo.findOne({ where: { id, library } });
    return await this.noteRepo.remove(note);
  }

  async updateNote(updateNoteDto: UpdateNoteDto, library: Library) {
    const note = await this.noteRepo.findOne({
      where: {
        id: updateNoteDto.id,
      },
    });
    if (updateNoteDto.title) note.title = updateNoteDto.title;
    if (updateNoteDto.note) note.note = updateNoteDto.note;
    return await this.noteRepo.save(note);
  }

  async findNote(id: number, library: Library) {
    return await this.noteRepo.findOne({
      where: {
        id,
        library,
      },
    });
  }

  //=====================================================
}
