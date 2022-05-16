import { listBook } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { BookRepository } from "../repositories/book-repository";
import { LocalError } from "../utils/LocalError";

interface BookUseCaseRequest {
  version: string;
  book: string;
}

export class BookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async get({ version, book }: BookUseCaseRequest) {
    if (!version)
      throw new LocalError(
        400,
        "Invalid Request Params",
        "Version is required."
      );
    if (!book)
      throw new LocalError(400, "Invalid Request Params", "Book is required.");
    const name: listBook = (<any>listBook)[book];
    if (!name)
      throw new LocalError(400, "Invalid Request Params", "Book is invalid.");
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
    if (!name)
      throw new LocalError(400, "Invalid Request Params", "Book is invalid.");
    if (!(await this.bookRepository.bookExists({ version, name })))
      try {
        await this.bookRepository.create({
          version,
          name,
        });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2025")
            throw new LocalError(
              400,
              "Invalid Request Params",
              "Version not exists."
            );
        }
      }
    else
      throw new LocalError(
        400,
        "Invalid Request Params",
        "Book already exists."
      );
  }
}
