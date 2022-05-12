import express from "express";
import { PrismaVersionsRepository } from "../repositories/prisma-version-repository";
import { ChapterUseCase } from "../use-cases/chapter-use-case";
import { LocalError } from "../utils/LocalError";

export const chapterRoutes = express.Router();

chapterRoutes.get("/:version/:book/:chapter", async (req, res) => {
  const { version, book } = req.params;
  const chapter = parseInt(req.params.chapter);

  try {
    const prismaVersionsRepository = new PrismaVersionsRepository();
    const getChapterUseCase = new ChapterUseCase(prismaVersionsRepository);
    const response = await getChapterUseCase.getChapter(version, book, chapter);
    return res.status(200).send(response);
  } catch (e) {
    if (e instanceof LocalError)
      return res.status(e.status).send({ error: e.text });
    return res.status(500).send(e);
  }
});
