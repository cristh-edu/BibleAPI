import { listBook } from "@prisma/client";

export interface VerseGetData {
  version: string;
  name: string;
  description: string;
}

export interface VerseRepository {
  find: (
    version: string,
    book: listBook,
    chapter: number,
    verse: number
  ) => Promise<VerseGetData | null>;
}
