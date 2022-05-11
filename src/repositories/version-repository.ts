import { ListBook } from "../utils/ListBook";

export type BibleGetData = Array<VersionGetData>;

export interface VersionGetData {
  version: string;
  name: string;
  description: string;
}

export interface VersionRepository {
  get: () => Promise<BibleGetData>;
  getVersion: (version: string) => Promise<VersionGetData | null>;
  getBook: (version: string, book: ListBook) => Promise<VersionGetData | null>;
  getChapter: (
    version: string,
    book: ListBook,
    chapter: number
  ) => Promise<VersionGetData | null>;
  getVerse: (
    version: string,
    book: ListBook,
    chapter: number,
    verse: number
  ) => Promise<VersionGetData | null>;
}
