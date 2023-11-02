require("dotenv").config();
import express, { Request, Response } from "express";
import cors from "cors";

import bodyParser from "body-parser";

import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import productRouter from "./routes/product.routes";
import orderRouter from "./routes/order.routes";
import versionRouter from "./routes/version.routes";
import colorRouter from "./routes/color.rouutes";

const app = express();
const port: number = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/versions", versionRouter);
app.use("/api/v1/colors", colorRouter);

app.listen(port, () => {
  console.log("server is running on http://localhost:8080");
});
