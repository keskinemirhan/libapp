import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { LibraryModule } from "src/library/library.module";
import { APP_FILTER } from "@nestjs/core";
import { UserExceptionFilter } from "./exceptions/users-exception.filter";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: "secret",
      signOptions: {
        expiresIn: "60000s",
      },
    }),
    forwardRef(() => LibraryModule),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    { provide: APP_FILTER, useClass: UserExceptionFilter },
  ],
  exports: [AuthService, UsersService],
})
export class UsersModule {}
