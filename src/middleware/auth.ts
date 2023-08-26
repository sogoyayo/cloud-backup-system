import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { StatusCodes } from 'http-status-codes';

const sendErrorResponse = (res: Response, status: number, message: string) => {
  return res.status(status).json({ error: message });
};

export const authenticationMiddleware = async (
  req: Request | any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader && !authHeader.startsWith('Bearer ')) {
        return sendErrorResponse(res, StatusCodes.ACCEPTED, 'No token provided');
    }
    // const token = authHeader.substring(7);
    const token = authHeader.split(' ')[1];

      if (!token) {
        return sendErrorResponse(res, 401, 'No token provided');
      }

      let verifiedUser;

      try {
        verifiedUser = jwt.verify(token, JWT_SECRET);
      } catch (error) {
        return sendErrorResponse(res, 401, 'Invalid token');
      }

    //   TODO
      const { email } = verifiedUser as { email: string };

      try {
        // const user = await User.findOne({ where: { email } });

        // if (!user) {
        //   return sendErrorResponse(
        //     res,
        //     401,
        //     'Kindly register or sign in as a user',
        //   );
        // }

        req.user = verifiedUser;
        next();
      } catch (error) {
        console.error('Error finding user:', error);
        return sendErrorResponse(res, 500, 'Internal server error');
      }
  } catch (error) {
    console.error('Error in user authentication middleware:', error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};