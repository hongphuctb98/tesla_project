import express from "express";

import {
  getAllProduct,
  getProductByCarId,
  updateCar,
} from "../controllers/product.controller";

const productRouter = express.Router();

productRouter.get("/", getAllProduct);

productRouter.get("/:id", getProductByCarId);

productRouter.put("/:id", updateCar);

export default productRouter;
