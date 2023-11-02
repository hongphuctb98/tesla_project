import { Response } from "express";
import db from "../utils/database";
import { handleResponseData } from "../utils/handleResponse";
import { HttpMessage, HttpStatus } from "../utils/enum";
import { User } from "../entities/user.enities";

/**
 * tìm kiếm và phân trang
 * @param keySearch : từ khóa tìm kiếm
 * @param pageNumber : sô trang hện tại
 * @param pageSize ; số lượng bản ghi 1 trang
 * @returns một mảng dữ liệu thỏa mãn điều kiện
 *
 */

export const getAll = async () => {
  return db.execute(`call Proc_user_getAll()`);
};

export const getOneByEmail = async (email: string) => {
  return db.execute(`call Proc_user_getByEmail(?)`, [email]);
};

export const getOneBuUserId = async (userId: string) => {
  return db.execute(`call Proc_user_getByUserId(?)`, [userId]);
};

export const create = async (user: User) => {
  return await db.execute(
    `Call Proc_user_create(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?, ?)`,
    [
      user.UserId,
      user.UserName,
      user.Gender,
      user.DateOfBirth,
      user.Email,
      user.Passwords,
      user.PhoneNumber,
      user.CreateDate,
      user.CreateBy,
      user.ModifyDate,
      user.ModifyBy,
      user.Address,
      user.Role,
    ]
  );
};

export const searchAndPaging = async (
  res: Response,
  keySearch: string,
  pageNumber: number,
  pageSize: number
) => {
  try {
    const users = await db.execute(
      "call Proc_user_SearchAndPaging(?,?,?)",
      [keySearch, pageNumber, pageSize]
    );
    return users;
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
