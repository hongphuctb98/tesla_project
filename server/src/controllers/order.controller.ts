import { Request, Response } from "express";
import * as orderServices from "../services/order.services";
import * as userServices from "../services/user.services";
import { handleResponseData } from "../utils/handleResponse";
import { HttpMessage, HttpStatus } from "../utils/enum";
import { log } from "console";
export const createOrder = async (req: Request, res: Response) => {
  try {
    let { loginUserEmail, ...dist } = req.body;
    let userId: string = "-1";
    if (req.body.loginUserEmail) {
      let [dataUser] = await userServices.getOneByEmail(
        req.body.loginUserEmail
      );
      userId = dataUser[0][0].UserId;
    }

    let newOrder = {
      ...dist,
      userId,
      orderDate: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    let data: any = await orderServices.orderCreate(newOrder);
    if (data[0].affectedRows > 0) {
      handleResponseData(
        res,
        null,
        HttpStatus.CREATED,
        HttpMessage.SUCCESS,
        "order success"
      );
    } else {
      handleResponseData(
        res,
        null,
        HttpStatus.BAD_REQUEST,
        HttpMessage.FAILED,
        "order failed"
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAll = async (req: Request | any, res: Response) => {
  try {
    let data: any;
    let { userLocation } = req;
    const { keysearch, pagenumber, pagesize } = req.query;
    if (userLocation.role === 1) {
      [data] = await orderServices.getOrderByUserId(userLocation.userId);
    } else {
      [data] = await orderServices.orderSearchAndPaging(
        keysearch,
        pagesize,
        pagenumber
      );
    }
    handleResponseData(
      res,
      data,
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

export const getOne = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let [data]: any = await orderServices.getOrderByOrderId(Number(id));
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
