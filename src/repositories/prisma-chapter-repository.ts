import { prisma } from "../prisma";
import { listBook } from "@prisma/client";
import { ChapterGetData, ChapterRepository } from "./chapter-repository";

export class PrismaChapterRepository implements ChapterRepository {
  async find(
    version: string,
    book: listBook,
    chapter: number
  ): Promise<ChapterGetData | null> {
    const result = await prisma.version.findUnique({
      select: {
        version: true,
        name: true,
        description: true,
        multiple: true,
        books: {
          select: {
            name: true,
            chapter: {
              select: {
                number: true,
                verses: {
                  select: {
                    verse: true,
                    verseEnd: true,
                    text: true,
                  },
                  orderBy: {
                    verse: "asc",
                  },
                },
              },
              where: {
                number: chapter,
              },
            },
          },
          where: {
            name: book,
          },
        },
      },
      where: {
        version,
      },
    });
    const bible = result;
    return bible;
  }
}
