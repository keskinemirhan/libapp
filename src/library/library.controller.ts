import {
  Controller,
  Get,
  Request,
  UseGuards,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Req,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/users/jwt.guard";
import { CreateBookDto } from "./dtos/create/create.book";
import { CreateCategoryDto } from "./dtos/create/create.category";
import { CreateNoteDto } from "./dtos/create/create.note.dto";
import { UpdateBookDto } from "./dtos/update/update.book.dto";
import { UpdateCategoryDto } from "./dtos/update/update.category.dto";
import { UpdateNoteDto } from "./dtos/update/update.note.dto";
import { LibraryService } from "./library.service";

@Controller("library")
@UseGuards(JwtAuthGuard)
export class LibraryController {
  constructor(private libraryService: LibraryService) {}

  //========== /library =======================

  @Get()
  getLibrary(@Request() request: any) {
    return request.user.library;
  }

  //========== /library/book ==================

  @Get("book")
  async getBooks(@Request() req: any) {
    const library = req.user.library;
    return this.libraryService.getBooks(library);
  }

  @Get("book/:id")
  getBook(@Param("id") id: number, @Request() req: any) {
    return this.libraryService.getBook(id, req.user.library);
  }

  @Patch("book")
  updateBook(@Body() updateBookDto: UpdateBookDto, @Request() req: any) {
    return this.libraryService.updateBook(updateBookDto, req.user.library);
  }

  @Post("book")
  createBook(@Body() createBookDto: CreateBookDto, @Request() req: any) {
    return this.libraryService.createBook(createBookDto, req.user.library);
  }

  @Delete("book/:id")
  async deleteBook(@Param("id") id: number, @Request() req: any) {
    return await this.libraryService.deleteBook(id, req.user.library);
  }
  //===========================================

  //============ /library/category ============
  @Get("category")
  async getCategoriesTree(@Request() req: any) {
    return await this.libraryService.getCategoriesTree(req.user.library);
  }

  @Get("category/flat")
  async getCategoriesFlat(@Request() req: any) {
    return await this.libraryService.getCategoriesArray(
      req.user.library.rootCategory
    );
  }

  @Post("category")
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @Request() req: any
  ) {
    return await this.libraryService.createCategory(
      createCategoryDto,
      req.user.library
    );
  }

  @Get("category/:id")
  async getCategory(@Param("id") id: number, @Request() req: any) {
    return this.libraryService.getCategory(id, req.user.library);
  }

  @Patch("category")
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Request() req: any
  ) {
    return await this.libraryService.updateCategory(
      updateCategoryDto,
      req.user.library
    );
  }

  @Delete("category/:id")
  async deleteCategory(@Param("id") id: number, @Request() req: any) {
    return await this.libraryService.deleteCategory(id, req.user.library);
  }

  //===========================================

  //================ /library/notes ===========

  @Get("notes")
  async findAllNotes(@Request() req: any) {
    return await this.libraryService.findAllNote(req.user.library);
  }

  @Get("notes/:id")
  async findNote(@Param("id") id: number, @Req() req: any) {
    return await this.libraryService.findNote(id, req.user.library);
  }

  @Get("notes/book/:id")
  async findNotesByBook(@Request() req: any, @Param("id") id: number) {
    return await this.libraryService.findNotesByBook(id, req.user.library);
  }

  @Post("notes")
  async createNote(@Body() createNoteDto: CreateNoteDto, @Req() req: any) {
    return await this.libraryService.createNote(
      createNoteDto,
      req.user.library
    );
  }

  @Patch("notes")
  async updateNote(@Body() updateNoteDto: UpdateNoteDto, @Req() req: any) {
    return await this.libraryService.updateNote(
      updateNoteDto,
      req.user.library
    );
  }

  @Delete("notes/:id")
  async deleteNote(@Param("id") id: number, @Req() req: any) {
    return await this.libraryService.deleteNote(id, req.user.library);
  }
}
