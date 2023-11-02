import express from "express";

const orderRouter = express.Router();

import { createOrder, getAll, getOne } from "../controllers/order.controller";
import { verifyToken } from "../middlewares/user.middlewares";

orderRouter.get("/", verifyToken, getAll);
orderRouter.get("/:id", getOne);
orderRouter.post("/", createOrder);

export default orderRouter;
