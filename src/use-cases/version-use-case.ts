import { VersionRepository } from "../repositories/version-repository";
import { LocalError } from "../utils/LocalError";

interface VersionUseCaseRequest {
  version: string;
  name: string;
  description: string;
  multiple?: boolean;
}

type BiblesUseCaseRequest = Array<VersionUseCaseRequest>;

export class VersionUseCase {
  constructor(private versionRepository: VersionRepository) {}

  async getVersions(): Promise<BiblesUseCaseRequest> {
    const versions = await this.versionRepository.findAll();
    const bibles: BiblesUseCaseRequest = versions;
    return bibles;
  }

  async getVersion(version: string): Promise<VersionUseCaseRequest> {
    if (!version) throw new Error("Version is required.");
    let bible = await this.versionRepository.find(version);
    if (!bible) {
      throw new LocalError(404, "Version not found");
    }
    return bible;
  }

  async post(request: VersionUseCaseRequest) {
    const { version, name, description, multiple } = request;

    if (!version) throw new LocalError(400, "Version is required.");
    if (!name) throw new LocalError(400, "Name is required.");
    if (!description) throw new LocalError(400, "Description is required.");

    await this.versionRepository.create({
      version,
      name,
      description,
      multiple,
    });
  }
}
