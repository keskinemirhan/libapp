import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OneToMany } from "typeorm";
import { Library } from "./library.entity";
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Category, (category) => category.topCategory)
  subCategories: Category[];

  @ManyToOne(() => Category, (category) => category.subCategories)
  topCategory: Category;

  @ManyToOne(() => Library, (library) => library.categorization)
  library: Library;
}
