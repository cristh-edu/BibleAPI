import { VersionRepository } from "../repositories/version-repository";
import { LocalError } from "../utils/LocalError";

interface GetVersionUseCaseRequest {
  version: string;
  name: string;
  description: string;
}

type GetBiblesUseCaseRequest = Array<GetVersionUseCaseRequest>;

export class GetVersionUseCase {
  constructor(private versionRepository: VersionRepository) {}

  async getVersions(): Promise<GetBiblesUseCaseRequest> {
    const versions = await this.versionRepository.findAll();
    const bibles: GetBiblesUseCaseRequest = versions;
    return bibles;
  }

  async getVersion(version: string): Promise<GetVersionUseCaseRequest> {
    if (!version) throw new Error("Version is required.");
    let bible = await this.versionRepository.find(version);
    if (!bible) {
      throw new LocalError(404, "Version not found");
    }
    return bible;
  }
}
