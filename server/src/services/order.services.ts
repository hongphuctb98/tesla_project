import db from "../utils/database";

export const getAllOrder = async () => {
  return db.execute(`call Proc_order_getAll()`);
};

export const orderSearchAndPaging = (
  keySearch: string,
  pageSize: number,
  currentPage: number
) => {
  return db.execute(`call Proc_order_SearchAndPaging(?,?,?)`, [
    keySearch,
    currentPage,

    pageSize,
  ]);
};

export const getOrderByUserId = async (userId: any) => {
  return db.execute(`call Proc_order_getByUserId(?)`, [userId]);
};

export const getOrderByOrderId = async (orderId: any) => {
  return db.execute(`call Proc_order_getByOrderId(?)`, [orderId]);
};

export const orderCreate = async (newOrder: any) => {
  let {
    userId,
    orderDate,
    totalPrice,
    status,
    carDetailId,
    address,
    email,
    phoneNumber,
    userName,
    autopilot,
    selfDriving,
  } = newOrder;

  return db.execute(`call Proc_order_create(?,?,?,?,?,?,?,?,?,?,?)`, [
    userId,
    orderDate,
    totalPrice,
    status,
    carDetailId,
    address,
    email,
    phoneNumber,
    userName,
    autopilot,
    selfDriving,
  ]);
};
