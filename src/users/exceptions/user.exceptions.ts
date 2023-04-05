import { HttpException, HttpStatus } from "@nestjs/common";

export class UserException extends HttpException {
  humblibStatus: number;
  constructor(code: number) {
    let httpStatus: number;
    let message: string;
    switch (code) {
      case UserExceptionCodes.INVALID_CREDENTIALS:
        httpStatus = HttpStatus.UNAUTHORIZED;
        message = "Invalid credentials";
        break;

      case UserExceptionCodes.EMAIL_IN_USE:
        httpStatus = HttpStatus.BAD_REQUEST;
        message = "email already in use";
        break;

      case UserExceptionCodes.USERNAME_IN_USE:
        httpStatus = HttpStatus.BAD_REQUEST;
        message = "username already in use";
        break;
      case UserExceptionCodes.USER_NOT_FOUND:
        httpStatus = HttpStatus.BAD_REQUEST;
        message = "user not found";
        break;
    }
    super(message, httpStatus);
    this.humblibStatus = code;
  }
}

export enum UserExceptionCodes {
  //login
  INVALID_CREDENTIALS = 1001,
  //register
  EMAIL_IN_USE = 1101,
  USERNAME_IN_USE = 1102,
  //access
  USER_NOT_FOUND = 1201,
}
