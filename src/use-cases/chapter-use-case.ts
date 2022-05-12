import { ChapterRepository } from "../repositories/chapter-repository";
import { LocalError } from "../utils/LocalError";

interface GetChapterUseCaseRequest {
  version: string;
  name: string;
  description: string;
}

export class ChapterUseCase {
  constructor(private chapterRepository: ChapterRepository) {}

  async getChapter(
    version: string,
    book: any,
    chapter: number
  ): Promise<GetChapterUseCaseRequest> {
    if (!chapter) throw new Error("Version is required.");
    let bible = await this.chapterRepository.find(version, book, chapter);
    if (!bible) {
      throw new LocalError(404, "Version not found");
    }
    return bible;
  }
}
