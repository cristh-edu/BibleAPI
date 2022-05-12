import { prisma } from "../prisma";
import { listBook } from "@prisma/client";
import { VerseGetData, VerseRepository } from "./verse-repository";

export class PrismaVerseRepository implements VerseRepository {
  async find(
    version: string,
    book: listBook,
    chapter: number,
    verse: number
  ): Promise<VerseGetData | null> {
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
                  where: {
                    OR: [
                      {
                        verse,
                      },
                      { verseEnd: verse },
                      {
                        AND: [
                          {
                            verse: {
                              lte: 3,
                            },
                          },
                          {
                            verseEnd: {
                              gte: 3,
                              not: null,
                            },
                          },
                        ],
                      },
                    ],
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
