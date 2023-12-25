import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../config";
import { AppError } from "../errors/AppError";
import { User } from "../modules/user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {
  const { id, password } = payload;

  // check the user exist or not
  const user = await User.isUserExistsByCustomId(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This User is not found!");
  }

  // check the user is deleted or not
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This User is deleted!");
  }

  // check the user is blocked or not
  if (user.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This User is blocked!");
  }

  if (!(await User.isPasswordCorrect(password, user.password))) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password is incorrect!");
  }

  // create an token and send to client
  const jwtPayload = {
    id: user.id,
    role: user.role,
  };
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  return {
    accessToken: token,
    needsPasswordChange: user.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
