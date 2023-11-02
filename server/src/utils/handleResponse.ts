import { Response } from "express";
export const handleResponseData = (
  res: Response,
  data: any,
  status: number,
  devMsg: string,
  userMsg: string
) => {
  return res.status(status).json({
    data,
    devMsg,
    userMsg,
    status,
  });
};
