import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeParent,
  TreeChildren,
  ManyToMany,
} from "typeorm";
import { Book } from "./book.entity";
import { Library } from "./library.entity";
@Entity()
@Tree("closure-table")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "string", length: 128 })
  name: string;

  @TreeParent()
  parent: Category;

  @TreeChildren()
  children: Category[];

  @OneToOne(() => Library, (library) => library.rootCategory, {
    cascade: true,
  })
  library: Library;

  @ManyToMany(() => Book, (book) => book.categories)
  books: Book[];
}
