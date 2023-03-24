import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { Library } from "./library.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Library, (library) => library.books)
  library: Library;

  @ManyToMany(() => Category, (cat) => cat.books, { eager: true })
  @JoinTable()
  categories: Category[];
}
