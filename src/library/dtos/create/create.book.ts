import { IsString, IsArray, ValidateNested } from "class-validator";

export class CreateBookDto {
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  categories: string[];
}
