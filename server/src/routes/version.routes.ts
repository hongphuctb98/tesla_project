import express from "express";

import {
  createVersion,
  updateVersion,
} from "../controllers/version.controller";

const versionRouter = express.Router();

versionRouter.post("/", createVersion);
versionRouter.patch("/:id", updateVersion);

export default versionRouter;
