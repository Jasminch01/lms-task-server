import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: { userEmail: string;},
  secret: string,
  expiresIn: any,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};//Task : must have to be save the token on browser cookies
