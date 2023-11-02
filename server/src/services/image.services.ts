import db from "../utils/database";

export const createImage = (carDetailId: number, imageurl: string) => {
  return db.execute(
    `insert into image (CardetailId, ImageUrl ) values (?, ?)`,
    [carDetailId, imageurl]
  );
};
