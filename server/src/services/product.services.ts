import db from "../utils/database";

export const getAllProduct = () => {
  return db.execute("call Proc_product_getAll()");
};

export const getProductByCarId = (id: number) => {
  return db.execute("call Proc_product_getOneByCarId(?)", [id]);
};

export const updateCar = (id: number, car: any) => {
  return db.execute("call Proc_product_UpdateCar(?,?,?,?,?,?)", [
    car.CarName,
    car.Descriptions || "",
    car.BasePrice,
    car.BgImage,
    car.MainImage,
    Number(id),
  ]);
};

export const createCarDetail = (
  carId: number,
  versionId: number,
  colorId: number
) => {
  return db.execute(
    `insert into cardetail (CarId, VersionId, ColorId) values (?, ?, ?)`,
    [carId, versionId, colorId]
  );
};
