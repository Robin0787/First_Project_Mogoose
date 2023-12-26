import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { AppError } from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // check the token is sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // check the token is valid or not
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { id, role, iat } = decoded;

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

    // check if the passwordChangeAt is bigger than jwtIssuedAt
    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Your password has changed! Please login again..",
      );
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      console.log({ requiredRoles, decodedRole: role });
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
