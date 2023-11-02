import { Request, Response } from "express";
import * as colorServices from "../services/color.services";
import { handleResponseData } from "../utils/handleResponse";
import { HttpMessage, HttpStatus } from "../utils/enum";

export const getAllColor = async (req: Request, res: Response) => {
  try {
    let [data] = await colorServices.getAllColor();
    handleResponseData(
      res,
      data[0],
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
