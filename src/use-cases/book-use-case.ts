import { listBook } from "@prisma/client";
import { BookRepository } from "../repositories/book-repository";
import { LocalError } from "../utils/LocalError";

interface BookUseCaseRequest {
  version: string;
  book: string;
}

export class BookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async get({ version, book }: BookUseCaseRequest) {
    if (!version) throw new Error("Version is required.");
    if (!book) throw new Error("Name of book is required.");
    const name: listBook = (<any>listBook)[book];
    let bible = await this.bookRepository.find(version, name);
    if (!bible) {
      throw new LocalError(404, "Version not found");
    }
    return bible;
  }

  async post({ version, book }: BookUseCaseRequest) {
    if (!version) throw new LocalError(400, "Version is required.");
    if (!book) throw new LocalError(400, "Name is required.");
    const name: listBook = (<any>listBook)[book];

    await this.bookRepository.create({
      version,
      name,
    });
  }
}
