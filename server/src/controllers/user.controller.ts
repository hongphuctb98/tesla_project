import { Request, Response } from "express";
import * as userService from "../services/user.services";
import { handleResponseData } from "../utils/handleResponse";
import { HttpMessage, HttpStatus } from "../utils/enum";
import { log } from "console";

export const getAll = async (req: Request, res: Response) => {
  const [data] = await userService.getAll();
  handleResponseData(
    res,
    data[0],
    HttpStatus.SUCCESS,
    null,
    HttpMessage.SUCCESS
  );
};
export const getOneByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const [data] = await userService.getOneBuUserId(userId);
  handleResponseData(
    res,
    data[0],
    HttpStatus.SUCCESS,
    null,
    HttpMessage.SUCCESS
  );
};

export const searchAndPaging = async (req: Request, res: Response) => {
  const keySearch: string = String(req.query.keysearch);
  const pageNumber: number = Number(req.query.pagenumber);
  const pageSize: number = Number(req.query.pagesize);

  const [users]: any = await userService.searchAndPaging(
    res,
    keySearch,
    pageNumber,
    pageSize
  );

  if (!Array.isArray(users)) {
    throw new Error(HttpMessage.FAILED);
  }
  const totalCount = users[0][0].total;
  const listUser = users[1];
  const data = {
    listUser,
    totalCount,
  };
  handleResponseData(res, data, HttpStatus.SUCCESS, null, HttpMessage.SUCCESS);
};
