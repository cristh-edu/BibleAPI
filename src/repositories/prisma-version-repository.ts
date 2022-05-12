import { prisma } from "../prisma";
import { ListBook } from "../utils/ListBook";
import {
  BibleGetData,
  VersionRepository,
  VersionGetData,
} from "./version-repository";

export class PrismaVersionsRepository implements VersionRepository {
  async findAll(): Promise<BibleGetData> {
    const versions = await prisma.version.findMany({
      select: {
        version: true,
        name: true,
        description: true,
      },
    });
    const bibles: BibleGetData = versions;
    return bibles;
  }

  async find(version: string): Promise<VersionGetData | null> {
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
