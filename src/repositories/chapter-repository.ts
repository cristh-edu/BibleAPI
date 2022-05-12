import { listBook } from "@prisma/client";

export interface ChapterRequestData {
  version: string;
  book: listBook;
  chapter: number;
}

export interface ChapterGetData {
  version: string;
  name: string;
  description: string;
}
export interface ChapterRepository {
  find: (request: ChapterRequestData) => Promise<ChapterGetData | null>;
  create: (request: ChapterRequestData) => Promise<void>;
}
