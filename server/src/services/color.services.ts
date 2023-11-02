import db from "../utils/database";

export const getAllColor = () => {
  return db.execute(`call Proc_color_getAll()`);
};
