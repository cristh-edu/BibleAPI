import express from "express";
import { PrismaChapterRepository } from "../repositories/prisma-chapter-repository";
import { ChapterUseCase } from "../use-cases/chapter-use-case";
import { LocalError } from "../utils/LocalError";

const prismaChapterRepository = new PrismaChapterRepository();
const getChapterUseCase = new ChapterUseCase(prismaChapterRepository);

export const chapterRoutes = express.Router();

chapterRoutes.get("/:version/:book/:chapter", async (req, res) => {
  const { version, book } = req.params;
  const chapter = parseInt(req.params.chapter);

  try {
    const response = await getChapterUseCase.getChapter(version, book, chapter);
    return res.status(200).send(response);
  } catch (e) {
    if (e instanceof LocalError)
      return res.status(e.status).send({ name: e.name, error: e.message });
    return res.status(500).send(e);
  }
});

chapterRoutes.post("/:version/:book", async (req, res) => {
  const { version, book } = req.params;
  const { chapter } = req.body;
  try {
    const response = await getChapterUseCase.post(version, book, chapter);
    return res.status(201).send({
      text: `Chapter ${chapter} successfully created in ${book} of the ${version} bible!`,
    });
  } catch (e) {
    if (e instanceof LocalError)
      return res.status(e.status).send({ name: e.name, error: e.message });
    return res.status(500).send(e);
  }
});
