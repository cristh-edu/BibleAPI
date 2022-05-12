import { BookRepository } from "../repositories/book-repository";
import { LocalError } from "../utils/LocalError";

interface GetBookUseCaseRequest {
  version: string;
  name: string;
  description: string;
}

export class GetBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async getBook(version: string, book: any): Promise<GetBookUseCaseRequest> {
    if (!version) throw new Error("Version is required.");
    let bible = await this.bookRepository.find(version, book);
    if (!bible) {
      throw new LocalError(404, "Version not found");
    }
    return bible;
  }
}
