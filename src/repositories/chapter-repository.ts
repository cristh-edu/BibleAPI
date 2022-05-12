import { listBook } from "@prisma/client";

export interface ChapterGetData {
  version: string;
  name: string;
  description: string;
}

export interface ChapterRepository {
  find: (
    version: string,
    book: listBook,
    chapter: number
  ) => Promise<ChapterGetData | null>;
}
