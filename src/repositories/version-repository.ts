import { ListBook } from "../utils/ListBook";

export type BibleGetData = Array<VersionGetData>;

export interface VersionGetData {
  version: string;
  name: string;
  description: string;
}

export interface VersionPostData {
  version: string;
  name: string;
  description: string;
  multiple?: boolean;
}

export interface VersionRepository {
  findAll: () => Promise<BibleGetData>;
  find: (version: string) => Promise<VersionGetData | null>;
  create: (data: VersionPostData) => void;
}
