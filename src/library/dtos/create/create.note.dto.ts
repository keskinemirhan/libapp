import { IsNumber, IsString } from "class-validator";

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  note: string;

  @IsNumber()
  bookId: number;
}
