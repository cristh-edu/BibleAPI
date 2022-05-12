import { prisma } from "../prisma";
import {
  ChapterRequestData,
  ChapterRepository,
  ChapterGetData,
} from "./chapter-repository";

export class PrismaChapterRepository implements ChapterRepository {
  async find({
    version,
    book,
    chapter,
  }: ChapterRequestData): Promise<ChapterGetData | null> {
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

  async create({ version, book, chapter }: ChapterRequestData) {
    const result = await prisma.version.findUnique({
      select: {
        books: {
          select: {
            id: true,
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

    await prisma.book.update({
      where: {
        id: result?.books[0].id,
      },
      data: {
        chapter: {
          create: {
            number: chapter,
          },
        },
      },
    });
  }
}
