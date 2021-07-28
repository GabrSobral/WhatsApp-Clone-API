import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("No token provided");
  }

  const tokenParts = authHeader.split(" ");

  if (tokenParts.length != 2) {
    throw new Error("Token error");
  }

  const [scheme, token] = tokenParts;

  if (!/^Bearer$/i.test(scheme)) {
    throw new Error("Token malformatted");
  }

  verify(token, process.env.TOKEN_SECRET, (error, decode) => {
    if (error) throw new Error(error.message);
    request.user_id = decode.id;
  });

  next();
};
