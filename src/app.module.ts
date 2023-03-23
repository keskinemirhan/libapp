import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { User } from "./users/entities/user.entity";
import { UsersModule } from "./users/users.module";
import { LibraryModule } from "./library/library.module";
import { Library } from "./library/entities/library.entity";
import { Book } from "./library/entities/book.entity";
import { Category } from "./library/entities/category.entity";
import { FileModule } from './file/file.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [User, Library, Book, Category],
      synchronize: true,
    }),
    LibraryModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
