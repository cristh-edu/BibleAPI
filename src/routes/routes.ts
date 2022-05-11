import express from "express";
import { PrismaVersionsRepository } from "../repositories/prisma-version-repository";
import { GetVersionUseCase } from "../use-cases/get-version-use-case";
import { versionRoutes } from "./version.routes";

export const routes = express.Router();

routes.get("/", async (req, res) => {
  try {
    const prismaFeedbacksRepository = new PrismaVersionsRepository();
    const getBibleUseCase = new GetVersionUseCase(prismaFeedbacksRepository);
    const response = await getBibleUseCase.getVersions();
    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) return res.status(500).send();
  }
});

routes.use("/version", versionRoutes);
