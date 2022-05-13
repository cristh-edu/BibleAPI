import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
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
    if (!bibles) throw new LocalError(404, "Not Found", "Bibles not found");
    return bibles;
  }

  async getVersion(version: string): Promise<VersionUseCaseRequest> {
    if (!version || version === "")
      throw new LocalError(
        400,
        "Invalid Request Params",
        "Version is required."
      );
    let bible = await this.versionRepository.find(version);
    if (!bible) throw new LocalError(404, "Not Found", "Version not found");
    return bible;
  }

  async post(request: VersionUseCaseRequest) {
    const { version, name, description, multiple } = request;

    if (!version) {
      throw new LocalError(
        400,
        "Invalid Request Params",
        "Version is required."
      );
    }
    if (!name)
      throw new LocalError(400, "Invalid Request Params", "Name is required.");
    if (!description)
      throw new LocalError(
        400,
        "Invalid Request Params",
        "Description is required."
      );
    try {
      await this.versionRepository.create({
        version,
        name,
        description,
        multiple,
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002")
          throw new LocalError(
            400,
            "Invalid Request Params",
            "Version already exists."
          );
      }
    }
  }
}
