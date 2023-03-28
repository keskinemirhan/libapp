import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class Note {
  @Column()
  title: string;

  @Column()
  note: string;

  @ManyToOne(() => Book, (book) => book.notes)
  book: Book;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
