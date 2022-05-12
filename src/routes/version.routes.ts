import express from "express";
import { PrismaVersionsRepository } from "../repositories/prisma-version-repository";
import { GetVersionUseCase } from "../use-cases/version-use-case";
import { LocalError } from "../utils/LocalError";

export const versionRoutes = express.Router();
const prismaVersionsRepository = new PrismaVersionsRepository();
const getBibleUseCase = new GetVersionUseCase(prismaVersionsRepository);

versionRoutes.get("/:version", async (req, res) => {
  const version = req.params.version;
  try {
    const response = await getBibleUseCase.getVersion(version);
    return res.status(200).send(response);
  } catch (e) {
    if (e instanceof LocalError)
      return res.status(e.status).send({ error: e.text });
    return res.status(500).send(e);
  }
});

versionRoutes.post("/", async (req, res) => {
  const { version, name, description, multiple = false } = req.body;
  try {
    const response = await getBibleUseCase.post({
      version,
      name,
      description,
      multiple,
    });
    return res.status(200).send(response);
  } catch (e) {
    if (e instanceof LocalError)
      return res.status(e.status).send({ error: e.text });
    return res.status(500).send(e);
  }
});
