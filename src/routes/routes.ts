import express from "express";
import { PrismaVersionsRepository } from "../repositories/prisma-version-repository";
import { VersionUseCase } from "../use-cases/version-use-case";
import { bookRoutes } from "./book.routes";
import { chapterRoutes } from "./chapter.routes";
import { verseRoutes } from "./verse.routes";
import { versionRoutes } from "./version.routes";

export const routes = express.Router();

routes.get("/", async (req, res) => {
  try {
    const prismaVersionsRepository = new PrismaVersionsRepository();
    const getBibleUseCase = new VersionUseCase(prismaVersionsRepository);
    const response = await getBibleUseCase.getVersions();
    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) return res.status(500).send();
  }
});

routes.use("/", versionRoutes);
routes.use("/", bookRoutes);
routes.use("/", chapterRoutes);
routes.use("/", verseRoutes);
