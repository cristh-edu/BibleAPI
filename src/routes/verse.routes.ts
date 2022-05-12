import express from "express";
import { PrismaVersionsRepository } from "../repositories/prisma-version-repository";
import { VerseUseCase } from "../use-cases/verse-use-case";
import { LocalError } from "../utils/LocalError";

export const verseRoutes = express.Router();

verseRoutes.get("/:version/:book/:chapter/:verse", async (req, res) => {
  const { version, book } = req.params;
  const chapter = parseInt(req.params.chapter);
  const verse = parseInt(req.params.verse);

  try {
    const prismaVersionsRepository = new PrismaVersionsRepository();
    const getVerseUseCase = new VerseUseCase(prismaVersionsRepository);
    const response = await getVerseUseCase.getVerse(
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
