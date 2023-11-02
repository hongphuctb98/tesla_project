import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.services";
import { log } from "console";
import { handleResponseData } from "../utils/handleResponse";
import { HttpMessage, HttpStatus } from "../utils/enum";
import jwt from "jsonwebtoken";

export const checkEmailExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;
    const [result] = await userService.getOneByEmail(email);
    if (result[0].length > 0) {
      handleResponseData(
        res,
        null,
        HttpStatus.ERROR,
        "Email existed",
        `Email ${email} existed`
      );
    } else {
      next();
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

export const verifyToken = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    handleResponseData(
      res,
      null,
      HttpStatus.ERROR,
      "Token is required",
      "Token is required"
    );
  } else {
    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userLocation = {
      role: decoded.role,
      userId: decoded.userId,
    };
    next();
  }
};
