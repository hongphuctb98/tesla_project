import express from "express";
import { getAllColor } from "../controllers/color.controller";

const colorRouter = express.Router();

colorRouter.get("/", getAllColor);

export default colorRouter;
