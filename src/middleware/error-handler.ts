import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };
  
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;