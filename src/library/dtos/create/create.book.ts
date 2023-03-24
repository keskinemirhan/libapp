import { IsString, IsArray, ValidateNested } from "class-validator";
import { Category } from "src/library/entities/category.entity";

export class CreateBookDto {
  @IsString()
  name: string;

  @IsArray()
  categories: string[];
}
