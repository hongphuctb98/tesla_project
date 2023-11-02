import * as productService from "../services/product.services";
import { Request, Response } from "express";
import { handleResponseData } from "../utils/handleResponse";
import { HttpMessage, HttpStatus } from "../utils/enum";
import { transformData } from "../utils/transformData";
import { log } from "console";
export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const [result]: any = await productService.getAllProduct();
    const [products] = result;

    const groupedProducts = transformData(products);

    handleResponseData(
      res,
      groupedProducts,
      HttpStatus.SUCCESS,
      null,
      HttpMessage.SUCCESS
    );
  } catch (error) {
    handleResponseData(
      res,
      null,
      HttpStatus.ERROR,
      error.message,
      HttpMessage.FAILED
    );
  }
};

export const getProductByCarId = async (req: Request, res: Response) => {
  const [data] = await productService.getProductByCarId(Number(req.params.id));
  const products = data[0];
  const [groupedProducts] = transformData(products);
  handleResponseData(
    res,
    groupedProducts,
    HttpStatus.SUCCESS,
    null,
    HttpMessage.SUCCESS
  );
};

export const updateCar = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;

    const data: any = await productService.updateCar(id, req.body);
    if (data[0].affectedRows > 0) {
      handleResponseData(
        res,
        data,
        HttpStatus.SUCCESS,
        null,
        HttpMessage.SUCCESS
      );
    }
  } catch (error) {
    handleResponseData(
      res,
      null,
      HttpStatus.ERROR,
      error.message,
      HttpMessage.FAILED
    );
  }
};
