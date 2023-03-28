import { IsNumber, IsString } from "class-validator";

export class UpdateNoteDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  note: string;
}
