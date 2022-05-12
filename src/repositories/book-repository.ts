import { listBook } from "@prisma/client";

export interface BookGetData {
  version: string;
  name: string;
  description: string;
}

export interface BookPostData {
  version: string;
  name: listBook;
}

export interface BookRepository {
  find: (version: string, book: listBook) => Promise<BookGetData | null>;
  create: (request: BookPostData) => Promise<void>;
}
