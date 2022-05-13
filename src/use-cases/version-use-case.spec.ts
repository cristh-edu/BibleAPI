import { PrismaVersionsRepository } from "../repositories/prisma-version-repository";
import { LocalError } from "../utils/LocalError";
import { VersionUseCase } from "./version-use-case";

const createVersionSpy = jest.fn();
const findVersionSpy = jest.fn();
const findAllVersionSpy = jest.fn();

const versionUseCase = new VersionUseCase({
  create: createVersionSpy,
  find: findVersionSpy,
  findAll: findAllVersionSpy,
});

describe("Create version", () => {
  it("should be able to create a version", async () => {
    await expect(
      versionUseCase.post({
        name: "Exemple Name",
        version: "INITIALS",
        description: "Exemple of description",
      })
    ).resolves.not.toThrow(LocalError);

    expect(createVersionSpy).toHaveBeenCalled();
  });

  it("should not be able to create a version without version param", async () => {
    await expect(
      versionUseCase.post({
        version: "",
        name: "Exemple name",
        description: "Exemple of description",
      })
    ).rejects.not.toThrowError();
  });

  it("should not be able to create a version without name param", async () => {
    await expect(
      versionUseCase.post({
        version: "INITIALS",
        name: "",
        description: "Exemple of description",
      })
    ).rejects.not.toThrowError();
  });

  it("should not be able to create a version without description param", async () => {
    await expect(
      versionUseCase.post({
        version: "INITIALS",
        name: "Exemple name",
        description: "",
      })
    ).rejects.not.toThrowError();
  });
});

const prismaVersionsRepository = new PrismaVersionsRepository();
const versionUseCaseConnect = new VersionUseCase(prismaVersionsRepository);

describe("Get versions connected a database", () => {
  it("should be able to get a versions", async () => {
    await expect(versionUseCaseConnect.getVersions()).resolves.not.toThrow();
  });

  it("should not be able to get a versions non-connection database", async () => {
    await expect(versionUseCase.getVersions()).rejects.not.toThrow();
  });
});

describe("Get version", () => {
  it("should not be able to get a version non-connection database", async () => {
    await expect(versionUseCase.getVersion("AM")).rejects.not.toThrow();
  });

  it("should not be able to get a version without version param", async () => {
    await expect(versionUseCase.getVersion("")).rejects.not.toThrow();
  });

  it("should be able to get a version", async () => {
    await expect(versionUseCaseConnect.getVersion("AM")).resolves.not.toThrow();
  });

  it("should not be able to get a version not-exists", async () => {
    await expect(
      versionUseCaseConnect.getVersion("notfound")
    ).rejects.not.toThrow();
  });
});
