import { prisma } from "../prisma";
import { listBook } from "@prisma/client";
import {
  VerseGetData,
  VerseRepository,
  VersePostData,
  VerseRequestData,
} from "./verse-repository";

export class PrismaVerseRepository implements VerseRepository {
  async find({
    version,
    book,
    chapter,
    verse,
  }: VerseRequestData): Promise<VerseGetData | null> {
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

  async create({
    version,
    book,
    chapter,
    verse,
    verseEnd,
    text,
  }: VersePostData) {
    const result = await prisma.version.findUnique({
      select: {
        books: {
          select: {
            chapter: {
              select: {
                id: true,
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

    await prisma.chapter.update({
      where: {
        id: result?.books[0].chapter[0].id,
      },
      data: {
        verses: {
          create: {
            verse,
            verseEnd,
            text,
          },
        },
      },
    });
  }
}
