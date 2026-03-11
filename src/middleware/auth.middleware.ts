import { Request, Response, NextFunction } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.cookies;
  if (!username) {
    res.status(301).redirect("/");
    return;
  }
  next();
};

export const checkNoAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username } = req.cookies;
  if (username) {
    res.status(301).redirect("/profile");
    return;
  }
  next();
};
