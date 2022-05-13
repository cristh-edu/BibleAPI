import { prisma } from "../prisma";
import { listBook } from "@prisma/client";
import { BookGetData, BookPostData, BookRepository } from "./book-repository";

export class PrismaBookRepository implements BookRepository {
  async find(version: string, book: listBook): Promise<BookGetData | null> {
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
              orderBy: {
                number: "asc",
              },
            },
          },
          orderBy: {
            name: "desc",
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

  async create({ version, name }: BookPostData) {
    await prisma.version.update({
      where: {
        version,
      },
      data: {
        books: {
          create: { name },
        },
      },
    });
  }

  async bookExists({ version, name }: BookPostData): Promise<boolean> {
    const book = await prisma.version.findFirst({
      where: { version },
      select: {
        books: {
          where: {
            name,
          },
        },
      },
    });
    return book?.books[0] ? true : false;
  }
}
