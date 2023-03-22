import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateBookDto {
  @IsNumber()
  bookId: number;

  @IsString()
  @IsOptional()
  bookName?: string;

  @IsArray()
  @IsOptional()
  categories?: string[];
}
