import { User } from "src/users/entities/user.entity";
import {
  Column,
  Entity,
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

  @OneToOne(() => User, (user) => user.library, { eager: true })
  user: User;

  @OneToMany(() => Book, (book) => book.library)
  books: Book[];

  @OneToMany(() => Category, (category) => category.library)
  categorization: Category[];
}
