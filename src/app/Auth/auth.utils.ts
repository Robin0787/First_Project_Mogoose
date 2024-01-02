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

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
