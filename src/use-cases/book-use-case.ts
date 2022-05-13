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
    if (!bible) throw new LocalError(404, "Not found", "Version not found");
    else if (!bible.books[0])
      throw new LocalError(404, "Not found", "Book not found");
    return bible;
  }

  async post({ version, book }: BookUseCaseRequest) {
    if (!version)
      throw new LocalError(
        400,
        "Invalid Request Params",
        "Version is required."
      );
    if (!book)
      throw new LocalError(400, "Invalid Request Params", "Name is required.");
    const name: listBook = (<any>listBook)[book];
    if (!(await this.bookRepository.bookExists({ version, name })))
      await this.bookRepository.create({
        version,
        name,
      });
    else
      throw new LocalError(
        400,
        "Invalid Request Params",
        "Book already exists."
      );
  }
}
