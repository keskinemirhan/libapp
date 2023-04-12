import { Library } from "src/library/entities/library.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 256 })
  username: string;

  //no need for max length
  @Column()
  password: string;

  @Column({ type: "varchar", length: 320 })
  email: string;

  @OneToOne(() => Library, (library) => library.user, { eager: true })
  @JoinColumn()
  library: Library;
}
