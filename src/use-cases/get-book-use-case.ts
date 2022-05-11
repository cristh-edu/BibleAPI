import { listBook } from "@prisma/client";
import { VersionRepository } from "../repositories/version-repository";
import { ListBook } from "../utils/ListBook";
import { LocalError } from "../utils/LocalError";

interface GetBookUseCaseRequest {
  version: string;
  name: string;
  description: string;
}

type GetBooksUseCaseRequest = Array<GetBookUseCaseRequest>;

export class GetBookUseCase {
  constructor(private versionRepository: VersionRepository) {}

  async getBook(version: string, book: any): Promise<GetBookUseCaseRequest> {
    if (!version) throw new Error("Version is required.");
    let bible = await this.versionRepository.getBook(version, book);
    if (!bible) {
      throw new LocalError(404, "Version not found");
    }
    return bible;
  }

  async getChapter(
    version: string,
    book: any,
    chapter: number
  ): Promise<GetBookUseCaseRequest> {
    if (!version) throw new Error("Version is required.");
    let bible = await this.versionRepository.getChapter(version, book, chapter);
    if (!bible) {
      throw new LocalError(404, "Version not found");
    }
    return bible;
  }

  async getVerse(
    version: string,
    book: any,
    chapter: number,
    verse: number
  ): Promise<GetBookUseCaseRequest> {
    if (!version) throw new Error("Version is required.");
    let bible = await this.versionRepository.getVerse(
      version,
      book,
      chapter,
      verse
    );
    if (!bible) {
      throw new LocalError(404, "Version not found");
    }
    return bible;
  }
}
