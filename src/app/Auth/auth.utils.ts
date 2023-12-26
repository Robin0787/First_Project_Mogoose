import jwt, { JwtPayload } from "jsonwebtoken";

export const createToken = (
  jwtPayload: JwtPayload,
  secret: string,
  expireTime: string,
) => {
  const token = jwt.sign(jwtPayload, secret, {
    expiresIn: expireTime,
  });

  return token;
};
