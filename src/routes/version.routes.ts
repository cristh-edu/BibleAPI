import express from "express";
import { PrismaVersionsRepository } from "../repositories/prisma-version-repository";
import { GetVersionUseCase } from "../use-cases/version-use-case";
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
