import {
  Controller,
  Get,
  Request,
  UseGuards,
  Post,
  Body,
  Patch,
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
  @Get()
  getLibrary(@Request() request: any) {
    return request.user.library;
  }

  @Get("book")
  async getBooks(@Request() req: any) {
    const library = req.user.library;
    return this.libraryService.getBooks(library);
  }

  @Patch("book")
  updateBook(@Body() updateBookDto: UpdateBookDto, @Request() req: any) {
    return this.libraryService.updateBook(updateBookDto, req.user.library);
  }
  @Post("book")
  createBook(@Body() createBookDto: CreateBookDto, @Request() req: any) {
    return this.libraryService.createBook(createBookDto, req.user.library);
  }

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
}
