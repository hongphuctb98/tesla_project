import express, { Request, Response } from "express";
import * as userController from "../controllers/user.controller";

const userRouter = express.Router();

// userRouter.get("/", userController.getAll);
userRouter.get("/:userId", userController.getOneByUserId);
userRouter.get("/", userController.searchAndPaging);

export default userRouter;
