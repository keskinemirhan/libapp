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

  @Column({ type: "varchar", length: 256 })
  title: string;

  @Column({ type: "varchar", length: 1500 })
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
