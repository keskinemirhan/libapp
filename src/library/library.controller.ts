import { Controller, Get, Request } from "@nestjs/common";

@Controller("library")
export class LibraryController {
  @Get()
  getLibrary(@Request() request: any) {
    return request.user.library;
  }
}
