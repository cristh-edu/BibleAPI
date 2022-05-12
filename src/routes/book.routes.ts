import { listBook } from "@prisma/client";
import express from "express";
import { PrismaBookRepository } from "../repositories/prisma-book-repository";
import { BookUseCase } from "../use-cases/book-use-case";
import { LocalError } from "../utils/LocalError";

export const bookRoutes = express.Router();

const prismaVersionsRepository = new PrismaBookRepository();
const getBookUseCase = new BookUseCase(prismaVersionsRepository);

bookRoutes.get("/:version/:book", async (req, res) => {
  const { version, book } = req.params;
  try {
    const response = await getBookUseCase.get({ version, book });
    return res.status(200).send(response);
  } catch (e) {
    if (e instanceof LocalError)
      return res.status(e.status).send({ error: e.text });
    return res.status(500).send(e);
  }
});

bookRoutes.post("/:version", async (req, res) => {
  const { name } = req.body;
  const { version } = req.params;
  try {
    const response = await getBookUseCase.post({ version, book: name });
    return res.status(201).send({
      text: `Livro da versão ${version} criado com sucesso!`,
    });
  } catch (e) {
    if (e instanceof LocalError)
      return res.status(e.status).send({ error: e.text });
    return res.status(500).send(e);
  }
});
