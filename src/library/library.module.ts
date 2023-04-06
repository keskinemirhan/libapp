import { forwardRef, Module } from "@nestjs/common";
import { LibraryService } from "./library.service";
import { LibraryController } from "./library.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Library } from "./entities/library.entity";
import { Book } from "./entities/book.entity";
import { Category } from "./entities/category.entity";
import { UsersModule } from "src/users/users.module";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { LibraryInterceptor } from "./interceptors/library.interceptor";
import { Note } from "./entities/note.entity";
import { LibraryExceptionFilter } from "./exceptions/library-exception.filter";

@Module({
  imports: [
    TypeOrmModule.forFeature([Library, Book, Category, Note]),
    forwardRef(() => UsersModule),
  ],
  providers: [
    LibraryService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LibraryInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: LibraryExceptionFilter,
    },
  ],
  controllers: [LibraryController],
  exports: [LibraryService],
})
export class LibraryModule {}
