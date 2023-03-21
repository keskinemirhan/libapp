import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeParent,
  TreeChildren,
} from "typeorm";
import { Library } from "./library.entity";
@Entity()
@Tree("closure-table")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @TreeParent()
  parent: Category;

  @TreeChildren()
  children: Category[];

  @OneToOne(() => Library, (library) => library.rootCategory, {
    cascade: true,
  })
  library: Library;
}
