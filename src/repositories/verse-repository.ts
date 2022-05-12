import { ListBook } from "../utils/ListBook";

export interface VerseGetData {
  version: string;
  name: string;
  description: string;
}

export interface VerseRepository {
  find: (
    version: string,
    book: ListBook,
    chapter: number,
    verse: number
  ) => Promise<VerseGetData | null>;
}
