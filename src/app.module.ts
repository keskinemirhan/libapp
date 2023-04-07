import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { LibraryModule } from "./library/library.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./humblib-config/configuration";
import { User } from "./users/entities/user.entity";
import { Library } from "./library/entities/library.entity";
import { Book } from "./library/entities/book.entity";
import { Category } from "./library/entities/category.entity";
import { Note } from "./library/entities/note.entity";
import { DatabaseEnv } from "./humblib-config/env.interface";

//

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      useFactory: (configService: ConfigService) => {
        const databaseConfig = configService.get<DatabaseEnv>("database");
        return {
          entities: [User, Book, Library, Category, Note],
          ...databaseConfig,
        } as TypeOrmModuleOptions;
      },
      inject: [ConfigService],
    }),
    LibraryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
