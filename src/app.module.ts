import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { LibraryModule } from "./library/library.module";
import { ConfigModule } from "@nestjs/config";
import configuration from "./humblib-config/configuration";
import { dataSourceOptions } from "./datasource";

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    UsersModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    LibraryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
