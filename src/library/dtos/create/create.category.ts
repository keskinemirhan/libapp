import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @MaxLength(128)
  @MinLength(1)
  name: string;

  @IsNumber()
  topCategory: number;
}
