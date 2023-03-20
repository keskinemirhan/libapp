import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Library } from "./library.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Library, (library) => library.books)
  library: Library;
}
