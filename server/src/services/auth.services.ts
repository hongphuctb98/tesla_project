import { User } from "../entities/user.enities";

import * as userServices from "../services/user.services";
export const register = async (user: User) => {
  return await userServices.create(user);
};
