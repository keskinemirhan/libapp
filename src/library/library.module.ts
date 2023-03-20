import { Module } from "@nestjs/common";
import { LibraryService } from "./library.service";
import { LibraryController } from "./library.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Library } from "./entities/library.entity";
import { Book } from "./entities/book.entity";
import { Category } from "./entities/category.entity";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Library, Book, Category]), UsersModule],
  providers: [LibraryService],
  controllers: [LibraryController],
})
export class LibraryModule {}
