import { HttpException, HttpStatus } from "@nestjs/common";

export class LibraryException extends HttpException {
  humblibStatus: number;
  info?: string;
  constructor(code: number, info?: string) {
    let httpStatus: number;
    let message: string;
    switch (code) {
      case LibraryExceptionCodes.BOOK_NOT_FOUND:
        httpStatus = HttpStatus.NOT_FOUND;
        message = "book not found";
        break;

      case LibraryExceptionCodes.CATEGORY_NOT_FOUND:
        httpStatus = HttpStatus.NOT_FOUND;
        message = "category not found";
        break;

      case LibraryExceptionCodes.NOTE_NOT_FOUND:
        httpStatus = HttpStatus.NOT_FOUND;
        message = "note not found";
        break;

      case LibraryExceptionCodes.LIBRARY_NOT_FOUND:
        httpStatus = HttpStatus.NOT_FOUND;
        message = "library not found";
        break;

      case LibraryExceptionCodes.INTERNAL_LIBRARY:
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        message = "internal library error";
        break;

      case LibraryExceptionCodes.EMPTY:
        httpStatus = HttpStatus.GONE;
        message = "";
        break;
    }
    super(message, httpStatus);
    this.humblibStatus = code;
    this.info = info;
  }
}

export enum LibraryExceptionCodes {
  EMPTY = 0,
  //books
  BOOK_NOT_FOUND = 2101,
  //categories
  CATEGORY_NOT_FOUND = 2201,
  //notes
  NOTE_NOT_FOUND = 2301,
  //library
  LIBRARY_NOT_FOUND = 2401,
  //internal
  INTERNAL_LIBRARY = 2501,
}
