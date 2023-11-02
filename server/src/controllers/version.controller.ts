import { Request, Response } from "express";
import { addVersion, editVersion } from "../services/version.services";
import { handleResponseData } from "../utils/handleResponse";
import { HttpMessage, HttpStatus } from "../utils/enum";
import { log } from "console";
import { createCarDetail } from "../services/product.services";
import { createImage } from "../services/image.services";

export const createVersion = async (req: Request, res: Response) => {
  try {
    const version = req.body;
    const dataVersion: any = await addVersion(version);
    const newVersionId = dataVersion[0].insertId;
    let dataCarDetail: any;
    if (newVersionId) {
      dataCarDetail = await createCarDetail(
        version.carId,
        newVersionId,
        version.colorId
      );
    }
    const newCardetailId = dataCarDetail[0].insertId;
    let dataImage: any;
    if (newCardetailId) {
      dataImage = await createImage(newCardetailId, req.body.image);
    }
    if (dataImage[0].affectedRows > 0) {
      handleResponseData(
        res,
        { data: dataVersion, insertId: dataVersion[0].insertId },
        HttpStatus.SUCCESS,
        null,
        HttpMessage.CREATED
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

export const updateVersion = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    const version = req.body;
    const data: any = await editVersion(id, version);
    if (data[0].affectedRows > 0) {
      handleResponseData(
        res,
        data,
        HttpStatus.SUCCESS,
        null,
        HttpMessage.UPDATED
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
