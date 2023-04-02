import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  topCategory?: number;
}
