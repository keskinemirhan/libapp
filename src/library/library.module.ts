import { Module } from "@nestjs/common";
import { LibraryService } from "./library.service";
import { LibraryController } from "./library.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Library } from "./entities/library.entity";
import { Book } from "./entities/book.entity";
import { Category } from "./entities/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Library, Book, Category])],
  providers: [LibraryService],
  controllers: [LibraryController],
})
export class LibraryModule {}
