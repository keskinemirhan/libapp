import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { LibraryService } from "../library.service";

//Interceptor to assign library entity to request object
//It takes user object from request
//JwtAuthGuard assigns logged in user to request object
@Injectable()
export class LibraryInterceptor implements NestInterceptor {
  constructor(private libraryService: LibraryService) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    req.user.library = await this.libraryService.findByUser(req.user);
    return next.handle();
  }
}
