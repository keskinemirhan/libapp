import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { UserException } from "./user.exceptions";

@Catch(UserException)
export class UserExceptionFilter implements ExceptionFilter {
  catch(exception: UserException, host: ArgumentsHost) {
    const code = exception.humblibStatus;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: String(code),
      detail: exception.message,
      path: request.url,
    });
  }
}
