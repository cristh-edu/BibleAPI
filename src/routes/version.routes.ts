import express from "express";
import { PrismaVersionsRepository } from "../repositories/prisma-version-repository";
import { GetBookUseCase } from "../use-cases/get-book-use-case";
import { GetVersionUseCase } from "../use-cases/get-version-use-case";
import { LocalError } from "../utils/LocalError";

export const versionRoutes = express.Router();

versionRoutes.get("/:version", async (req, res) => {
  const version = req.params.version;
  try {
    const prismaVersionsRepository = new PrismaVersionsRepository();
    const getBibleUseCase = new GetVersionUseCase(prismaVersionsRepository);
    const response = await getBibleUseCase.getVersion(version);
    return res.status(200).send(response);
  } catch (e) {
    if (e instanceof LocalError)
      return res.status(e.status).send({ error: e.text });
    return res.status(500).send(e);
  }
});

versionRoutes.get("/:version/:book", async (req, res) => {
  const version = req.params.version;
  const book = req.params.book;
  try {
    const prismaVersionsRepository = new PrismaVersionsRepository();
    const getBookUseCase = new GetBookUseCase(prismaVersionsRepository);
    const response = await getBookUseCase.getBook(version, book);
    return res.status(200).send(response);
  } catch (e) {
    if (e instanceof LocalError)
      return res.status(e.status).send({ error: e.text });
    return res.status(500).send(e);
  }
});

versionRoutes.get("/:version/:book/:chapter", async (req, res) => {
  const version = req.params.version;
  const book = req.params.book;
  const chapter = parseInt(req.params.chapter);

  try {
    const prismaVersionsRepository = new PrismaVersionsRepository();
    const getBookUseCase = new GetBookUseCase(prismaVersionsRepository);
    const response = await getBookUseCase.getChapter(version, book, chapter);
    return res.status(200).send(response);
  } catch (e) {
    if (e instanceof LocalError)
      return res.status(e.status).send({ error: e.text });
    return res.status(500).send(e);
  }
});

versionRoutes.get("/:version/:book/:chapter/:verse", async (req, res) => {
  const { version, book } = req.params;
  const chapter = parseInt(req.params.chapter);
  const verse = parseInt(req.params.verse);

  try {
    const prismaVersionsRepository = new PrismaVersionsRepository();
    const getBookUseCase = new GetBookUseCase(prismaVersionsRepository);
    const response = await getBookUseCase.getVerse(
      version,
      book,
      chapter,
      verse
    );
    return res.status(200).send(response);
  } catch (e) {
    if (e instanceof LocalError)
      return res.status(e.status).send({ error: e.text });
    return res.status(500).send(e);
  }
});
