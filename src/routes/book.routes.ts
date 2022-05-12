import express from "express";
import { PrismaVersionsRepository } from "../repositories/prisma-version-repository";
import { GetBookUseCase } from "../use-cases/book-use-case";
import { LocalError } from "../utils/LocalError";

export const bookRoutes = express.Router();

bookRoutes.get("/:version/:book", async (req, res) => {
  const { version, book } = req.params;
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
