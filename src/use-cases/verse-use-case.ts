import { VerseRepository } from "../repositories/verse-repository";
import { LocalError } from "../utils/LocalError";

interface GetVerseUseCaseRequest {
  version: string;
  name: string;
  description: string;
}

export class VerseUseCase {
  constructor(private verseRepository: VerseRepository) {}

  async getVerse(
    version: string,
    book: any,
    chapter: number,
    verse: number
  ): Promise<GetVerseUseCaseRequest> {
    if (!version) throw new Error("Version is required.");
    let bible = await this.verseRepository.find(version, book, chapter, verse);
    if (!bible) {
      throw new LocalError(404, "Version not found");
    }
    return bible;
  }
}
