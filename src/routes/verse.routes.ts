import express from "express";
import { PrismaVerseRepository } from "../repositories/prisma-verse-repository";
import { VerseUseCase } from "../use-cases/verse-use-case";
import { LocalError } from "../utils/LocalError";

export const verseRoutes = express.Router();

const prismaVerseRepository = new PrismaVerseRepository();
const getVerseUseCase = new VerseUseCase(prismaVerseRepository);

verseRoutes.get("/:version/:book/:chapter/:verse", async (req, res) => {
  const { version, book } = req.params;
  const chapter = parseInt(req.params.chapter);
  const verse = parseInt(req.params.verse);

  try {
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

verseRoutes.post("/:version/:book/:chapter", async (req, res) => {
  const { version, book, chapter } = req.params;
  const { verse, verseEnd, text } = req.body;
  try {
    const response = await getVerseUseCase.post(
      version,
      book,
      chapter,
      verse,
      verseEnd,
      text
    );
    return res.status(201).send({
      text: `Capítulo ${chapter} do livro ${book} da versão ${version} criado com sucesso!`,
    });
  } catch (e) {
    if (e instanceof LocalError)
      return res.status(e.status).send({ error: e.text });
    return res.status(500).send(e);
  }
});
