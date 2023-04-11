import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Request, Response } from "express";
import { LibraryException } from "./library.exceptions";

@Catch(LibraryException)
export class LibraryExceptionFilter implements ExceptionFilter {
  catch(exception: LibraryException, host: ArgumentsHost) {
    const code = exception.humblibStatus;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (exception.info) {
      response.status(status).json({
        statusCode: code,
        info: exception.info,
        detail: exception.message,
        path: request.url,
      });
    } else
      response.status(status).json({
        statusCode: String(code), // as string
        detail: exception.message,
        path: request.url,
      });
  }
}
