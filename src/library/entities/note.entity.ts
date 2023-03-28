import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

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
