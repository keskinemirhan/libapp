import {
  IsString,
  IsArray,
  ValidateNested,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateBookDto {
  @IsString()
  @MaxLength(256)
  @MinLength(1)
  name: string;

  @IsArray()
  categories: number[];
}
