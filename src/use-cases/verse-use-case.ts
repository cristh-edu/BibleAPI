import { listBook } from "@prisma/client";
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
    bookName: string,
    chapter: number,
    verse: number
  ): Promise<GetVerseUseCaseRequest> {
    if (!version) throw new Error("Version is required.");
    const book: listBook = (<any>listBook)[bookName];
    let bible = await this.verseRepository.find({
      version,
      book,
      chapter,
      verse,
    });
    if (!bible) {
      throw new LocalError(404, "Not Found", "Version not found");
    }
    return bible;
  }

  async post(
    version: string,
    bookName: string,
    chapterText: string,
    verseText: string,
    verseEndText: string,
    text: string
  ) {
    if (!version)
      throw new LocalError(
        400,
        "Invalid Request Params",
        "Version is required."
      );
    if (!bookName)
      throw new LocalError(400, "Invalid Request Params", "Name is required.");
    const book: listBook = (<any>listBook)[bookName];

    if (!chapterText)
      throw new LocalError(
        400,
        "Invalid Request Params",
        "Chapter is required."
      );
    const chapter = parseInt(chapterText);
    if (!chapter || chapter < 1 || chapter > 150)
      throw new LocalError(400, "Invalid Request Params", "Chapter invalid.");

    if (!verseText)
      throw new LocalError(400, "Invalid Request Params", "Verse is required.");
    const verse = parseInt(verseText);
    if (!verse || verse < 1 || verse > 176)
      throw new LocalError(400, "Invalid Request Params", "Verse invalid.");
    if (verseEndText) {
      const verseEnd = parseInt(verseEndText);
      if (!verseEnd || verseEnd < 1 || verseEnd > 176)
        throw new LocalError(400, "Invalid Request Params", "Verse invalid.");
      await this.verseRepository.create({
        version,
        book,
        chapter,
        verse,
        verseEnd,
        text,
      });
    } else
      await this.verseRepository.create({
        version,
        book,
        chapter,
        verse,
        text,
      });
  }
}
