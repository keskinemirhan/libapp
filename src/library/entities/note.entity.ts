import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Book } from "./book.entity";
import { Library } from "./library.entity";

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  note: string;

  @ManyToOne(() => Book, (book) => book.notes, {
    createForeignKeyConstraints: false,
  })
  book: Book;

  @ManyToOne(() => Library, (library) => library.notes)
  library: Library;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
