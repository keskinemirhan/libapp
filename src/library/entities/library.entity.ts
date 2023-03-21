import { User } from "src/users/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./book.entity";
import { Category } from "./category.entity";

@Entity()
export class Library {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => User, (user) => user.library)
  user: User;

  @OneToMany(() => Book, (book) => book.library)
  books: Book[];

  @OneToOne(() => Category, (category) => category.library)
  @JoinColumn()
  rootCategory: Category;
}
