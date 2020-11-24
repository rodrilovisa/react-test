import { LOGIN_USER_START } from "../../constants/actionTypes";

export const loginUserAction = (user, from) => {
  return {
    type: LOGIN_USER_START,
    user,
    from,
  };
};
