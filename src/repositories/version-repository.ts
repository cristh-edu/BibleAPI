export type BibleGetData = Array<VersionGetData>;

export interface VersionGetData {
  version: string;
  name: string;
  description: string;
}

export interface VersionRepository {
  get: () => Promise<BibleGetData>;
  getVersion: (version: string) => Promise<VersionGetData | null>;
}
