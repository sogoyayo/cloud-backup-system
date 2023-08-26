import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/database';
import { v4 as UUIDV4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User';
import { UserRole } from '../enums/userRoles';
import { generateToken } from '../utils/utilities';
import CustomError from '../exceptions';



// const User = require('../models/User');
// const { StatusCodes } = require('http-status-codes');
// const CustomError = require('../errors');
// const { attachCookiesToResponse, createTokenUser } = require('../utils');

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, full_name } = req.body;

    if (!email || !password || !full_name) {
      throw new CustomError.BadRequestError('Provide all fields');
    }

    const existingUser = await User.getUserByEmail(email);
    if (existingUser) {
      throw new CustomError.BadRequestError('Email already exists');
    }

    // first registered user is an admin
    const isFirstAccount = (await User.countUsers()) === 0;
    const role = isFirstAccount ? UserRole.ADMIN : UserRole.USER;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(UUIDV4());
    
    const generatedID = UUIDV4();
    
    await User.createUser(generatedID, email, hashedPassword, full_name, role);

    const token = generateToken({id: generatedID, email, full_name, role}, res)

    res.status(StatusCodes.CREATED).json({ token, user: {id: generatedID, email, full_name, role}, message: 'User registered successfully' });
  } catch (error) {
    // console.error('Error in register:', error);
    next(error)
  }
};


export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError.BadRequestError('Please provide email and password');
    }

    const user = await User.getUserByEmail(email);
    // console.log(user);
    
    if (!user) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    const token = generateToken({ userId: user.id, email: user.email, full_name: user.full_name, role: user.role }, res)
    // res.status(200).json({ token });
    res.status(StatusCodes.OK).json({ token, user: {id: user.id, email: user.email, full_name: user.full_name, role: user.role }, message: 'Login successful' });
  } catch (error) {
    // console.error('Error in login:', error);
    next(error)
  }
};


export const logout = async (req: Request, res: Response) => {

};

