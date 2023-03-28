import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { Library } from "./library.entity";
import { Note } from "./note.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Library, (library) => library.books)
  library: Library;

  @OneToMany(() => Note, (note) => note.book)
  notes: Note[];

  @ManyToMany(() => Category, (cat) => cat.books, { eager: true })
  @JoinTable()
  categories: Category[];
}
