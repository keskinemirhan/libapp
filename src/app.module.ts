import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { User } from "./users/entities/user.entity";
import { UsersModule } from "./users/users.module";
import { LibraryModule } from "./library/library.module";
import { Library } from "./library/entities/library.entity";
import { Book } from "./library/entities/book.entity";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [User, Library, Book],
      synchronize: true,
    }),
    LibraryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
