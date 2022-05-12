import { ListBook } from "../utils/ListBook";

export interface BookGetData {
  version: string;
  name: string;
  description: string;
}

export interface BookRepository {
  find: (version: string, book: ListBook) => Promise<BookGetData | null>;
}
