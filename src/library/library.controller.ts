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
} from "@nestjs/common";
import { JwtAuthGuard } from "src/users/jwt.guard";
import { CreateBookDto } from "./dtos/create/create.book";
import { CreateCategoryDto } from "./dtos/create/create.category";
import { UpdateBookDto } from "./dtos/update/update.book.dto";
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
  async getCategory(@Request() req: any) {
    return await this.libraryService.getCategoriesTree(req.user.library);
  }

  @Post("category")
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @Request() req: any
  ) {
    return this.libraryService.createCategory(
      createCategoryDto,
      req.user.library
    );
  }

  //===========================================
}
