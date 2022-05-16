import { PrismaBookRepository } from "../repositories/prisma-book-repository";
import { LocalError } from "../utils/LocalError";
import { BookUseCase } from "./book-use-case";

const createBookSpy = jest.fn();
const findBookSpy = jest.fn();
const bookExistsSpy = jest.fn();

const bookUseCase = new BookUseCase({
  create: createBookSpy,
  find: findBookSpy,
  bookExists: bookExistsSpy,
});

const prismaBooksRepository = new PrismaBookRepository();
const bookUseCaseConnect = new BookUseCase(prismaBooksRepository);

describe("Create book", () => {
  it("should be able to create a book", async () => {
    await expect(
      bookUseCase.post({
        version: "Exemple Name",
        book: "JOHN3",
      })
    ).resolves.not.toThrow(LocalError);

    expect(createBookSpy).toHaveBeenCalled();
    expect(bookExistsSpy).toHaveBeenCalled();
  });

  it("should not be able to create a book without book param", async () => {
    await expect(
      bookUseCase.post({
        book: "",
        version: "Exemple version",
      })
    ).rejects.not.toThrowError();
  });

  it("should not be able to create a book without version param", async () => {
    await expect(
      bookUseCase.post({
        book: "JOHN3",
        version: "",
      })
    ).rejects.not.toThrowError();
  });

  it("should not be able to create a book with invalid name param", async () => {
    await expect(
      bookUseCase.post({
        book: "INVALID",
        version: "EXEMPLE",
      })
    ).rejects.not.toThrowError();
  });

  it("should not be able to create an existing book", async () => {
    await expect(
      bookUseCaseConnect.post({ version: "AM", book: "JOHN3" })
    ).rejects.not.toThrow();
  });

  it("should not be able to create a book with a version not-exists", async () => {
    await expect(
      bookUseCaseConnect.post({ version: "NOT-EXISTS", book: "JOHN3" })
    ).rejects.not.toThrow();
  });
});

describe("Get book", () => {
  it("should not be able to get a book non-connection database", async () => {
    await expect(
      bookUseCase.get({ version: "AM", book: "JOHN3" })
    ).rejects.not.toThrow();
  });

  it("should not be able to get a book without book param", async () => {
    await expect(
      bookUseCase.get({ version: "AM", book: "" })
    ).rejects.not.toThrow();
  });

  it("should not be able to get a book without version param", async () => {
    await expect(
      bookUseCase.get({ version: "", book: "JOHN" })
    ).rejects.not.toThrow();
  });

  it("should not be able to get a book with a book name invalid", async () => {
    await expect(
      bookUseCase.get({ version: "version", book: "INVALID" })
    ).rejects.not.toThrow();
  });

  it("should be able to get a book", async () => {
    await expect(
      bookUseCaseConnect.get({ version: "AM", book: "JOHN3" })
    ).resolves.not.toThrow();
  });

  it("should not be able to get a book with a version not-exists", async () => {
    await expect(
      bookUseCaseConnect.get({ version: "NOT-EXISTS", book: "JOHN" })
    ).rejects.not.toThrow();
  });

  it("should not be able to get a book with a version not-exists", async () => {
    await expect(
      bookUseCaseConnect.get({ version: "teste", book: "REVELATION" })
    ).rejects.not.toThrow();
  });
});
