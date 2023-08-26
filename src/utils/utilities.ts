import jwt from 'jsonwebtoken';

import {
  JWT_SECRET, JWT_LIFETIME
} from '../config';

  export const generateToken = (payload: object, res: Response | any) => {
    try {
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_LIFETIME });
      
      // res.cookie('token', token, {
      //   httpOnly: true,
      //   maxAge: 30 * 24 * 60 * 60 * 1000,
      // });

      return token;
    } catch (error) {
      console.error(error);
      throw new Error('Error generating token');
    }
  };


  export const validateToken = async (token: string) => {
    try {
      const decodedToken: any = jwt.verify(token, JWT_SECRET);
  
      const expiry = new Date(decodedToken.expiry);
      if (expiry.getTime() < new Date().getTime()) {
        return { valid: false, email: null };
      }
      console.log(decodedToken);
      return { valid: true, email: decodedToken.email };
    } catch (error) {
      console.error(error);
      return { valid: false, email: null };
    }
  };