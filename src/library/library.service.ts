import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Library } from "./entities/library.entity";

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Library) private libRepo: Repository<Library>
  ) {}

  findAll() {
    return this.libRepo.find();
  }

  create() {
    const library = this.libRepo.create();
  }
}
