import { Request, Response } from "express";
import * as authService from "../services/auth.services";
import * as userService from "../services/user.services";
import { handleResponseData } from "../utils/handleResponse";
import { HttpMessage, HttpStatus } from "../utils/enum";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { User } from "../entities/user.enities";
import jwt from "jsonwebtoken";
3;
import { log } from "console";

export const register = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    console.log(user);

    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(user.passwords, salt);
    const newUserId = uuidv4();
    const newUser = {
      UserId: newUserId,
      UserName: user.userName,
      DateOfBirth: new Date().toISOString().split("T")[0],
      Gender: 0,
      Email: user.email,
      Passwords: hashPassword,
      PhoneNumber: user.phoneNumber,
      CreateDate: new Date().toISOString().split("T")[0],
      CreateBy: user.userName,
      ModifyDate: new Date().toISOString().split("T")[0],
      ModifyBy: user.userName,
      Address: "",
      Role: 1,
    } as User;

    const data = await authService.register(newUser);
    handleResponseData(
      res,
      data,
      HttpStatus.SUCCESS,
      null,
      HttpMessage.CREATED
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, passwords } = req.body;
    const [findUser] = await userService.getOneByEmail(email);
    const [user] = findUser as any;

    if (user?.length === 0) {
      handleResponseData(
        res,
        null,
        HttpStatus.NOT_FOUND,
        null,
        "User not found"
      );
    } else {
      const hashPassword = await user[0].Passwords;
      const compare = await bcrypt.compareSync(passwords, hashPassword);
      if (!compare) {
        handleResponseData(
          res,
          null,
          HttpStatus.BAD_REQUEST,
          null,
          "Password is incorrect"
        );
      } else {
        const token = jwt.sign(
          {
            userId: user[0].UserId,
            userName: user[0].UserName,
            role: user[0].Role,
          },
          process.env.TOKEN_SECRET as string,
          { expiresIn: "1d" }
        );

        handleResponseData(
          res,
          {
            token,
            user: {
              userId: user[0].UserId,
              userName: user[0].UserName,
              email: user[0].Email,
              phoneNumber: user[0].PhoneNumber,
              role: user[0].Role,
            },
          },
          HttpStatus.SUCCESS,
          null,
          "login success"
        );
      }
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
