import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class UpdateBookDto {
  @IsNumber()
  bookId: number;

  @IsString()
  @IsOptional()
  @MaxLength(256)
  @MinLength(1)
  bookName?: string;

  @IsArray()
  @IsOptional()
  categories?: number[];
}
