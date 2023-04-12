import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateNoteDto {
  @IsString()
  @MaxLength(256)
  @MinLength(1)
  title: string;

  @IsString()
  @MaxLength(1500)
  note: string;

  @IsNumber()
  bookId: number;
}
