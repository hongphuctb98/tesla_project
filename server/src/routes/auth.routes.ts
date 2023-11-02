import { login, register } from "../controllers/auth.controller";
import express from "express";
import { checkEmailExist } from "../middlewares/user.middlewares";
const authRouter = express.Router();

authRouter.post("/register", checkEmailExist, register);
authRouter.post("/login", login);

export default authRouter;
