import { NextFunction, Request, Response } from "express";
import RouteNotFoundException from "../errors/custom_exceptions/route-not-found-exception";

/**
 * this is for handle unhandled routes
 * @param req  request
 * @param res response
 * @param next  next function
 * @returns
 */
const unhandledRouteMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return next(new RouteNotFoundException());
};

export default unhandledRouteMiddleware;
