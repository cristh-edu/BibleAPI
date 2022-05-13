import { listBook } from "@prisma/client";
import {
  ChapterRepository,
  ChapterRequestData,
} from "../repositories/chapter-repository";
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
    name: string,
    chapter: number
  ): Promise<GetChapterUseCaseRequest> {
    if (!chapter) throw new Error("Version is required.");
    const book: listBook = (<any>listBook)[name];
    let bible = await this.chapterRepository.find({ version, book, chapter });
    if (!bible) {
      throw new LocalError(404, "Not Found", "Version not found");
    }
    return bible;
  }

  async post(version: string, bookName: string, chapter: string) {
    if (!version)
      throw new LocalError(
        400,
        "Invalid Request Params",
        "Version is required."
      );
    if (!bookName)
      throw new LocalError(400, "Invalid Request Params", "Name is required.");
    const book: listBook = (<any>listBook)[bookName];
    if (!chapter)
      throw new LocalError(
        400,
        "Invalid Request Params",
        "Chapter is required."
      );
    const number = parseInt(chapter);
    if ((number && number < 1) || number > 150)
      throw new LocalError(400, "Invalid Request Params", "Chapter invalid.");

    await this.chapterRepository.create({
      version,
      book,
      chapter: number,
    });
  }
}
