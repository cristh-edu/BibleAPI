import { ListBook } from "../utils/ListBook";

export interface ChapterGetData {
  version: string;
  name: string;
  description: string;
}

export interface ChapterRepository {
  find: (
    version: string,
    book: ListBook,
    chapter: number
  ) => Promise<ChapterGetData | null>;
}
