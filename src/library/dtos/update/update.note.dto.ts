import { IsNumber, IsString, MaxLength } from "class-validator";

export class UpdateNoteDto {
  @IsNumber()
  id: number;

  @IsString()
  @MaxLength(256)
  title: string;

  @IsString()
  @MaxLength(1500)
  note: string;
}
