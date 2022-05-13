import { listBook } from "@prisma/client";

export interface VersePostData {
  version: string;
  book: listBook;
  chapter: number;
  verse: number;
  verseEnd?: number;
  text: string;
}

export interface VerseRequestData {
  version: string;
  book: listBook;
  chapter: number;
  verse: number;
}
export interface VerseGetData {
  version: string;
  name: string;
  description: string;
}

export interface VerseRepository {
  find: (request: VerseRequestData) => Promise<VerseGetData | null>;
  create: (request: VersePostData) => Promise<void>;
}
