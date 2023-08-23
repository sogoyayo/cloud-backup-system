import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/database';
import { v4 as UUIDV4 } from 'uuid';
import { countUsers, createUser, getUserByEmail } from '../models/User';
import { UserRole } from '../enums/userRoles';


// const User = require('../models/User');
// const { StatusCodes } = require('http-status-codes');
// const CustomError = require('../errors');
// const { attachCookiesToResponse, createTokenUser } = require('../utils');

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, full_name } = req.body;

    if (!email || !password || !full_name) {
      res.status(401).json({ message: 'Please enter all fields' });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ message: 'Email already exists' });
      return;
    }

    // first registered user is an admin
    const isFirstAccount = (await countUsers()) === 0;
    const role = isFirstAccount ? UserRole.ADMIN : UserRole.USER;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(UUIDV4());
    
    const generatedID = UUIDV4();
    
    await createUser(generatedID, email, hashedPassword, full_name, role);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ message: 'An error occurred while registering user' });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({ message: 'Please enter all fields' });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      res.status(401).json({ message: 'Authentication failed' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: 'Authentication failed' });
      return;
    }

    // const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
    // res.status(200).json({ token });
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
};

export const login2 = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    // throw new CustomError.BadRequestError('Please provide email and password');
    res.status(401).json({ message: 'Please enter all fields' });
  }
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new CustomError.UnauthenticatedError('Invalid Credentials');
//   }
//   const isPasswordCorrect = await user.comparePassword(password);
//   if (!isPasswordCorrect) {
//     throw new CustomError.UnauthenticatedError('Invalid Credentials');
//   }
//   const tokenUser = createTokenUser(user);
//   attachCookiesToResponse({ res, user: tokenUser });

//   res.status(StatusCodes.OK).json({ user: tokenUser });
};

export const logout = async (req: Request, res: Response) => {
//   res.cookie('token', 'logout', {
//     httpOnly: true,
//     expires: new Date(Date.now() + 1000),
//   });
//   res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

export const upload = async (req: Request, res: Response) => {
//   res.cookie('token', 'logout', {
//     httpOnly: true,
//     expires: new Date(Date.now() + 1000),
//   });
//   res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};
export const createFolder = async (req: Request, res: Response) => {
//   res.cookie('token', 'logout', {
//     httpOnly: true,
//     expires: new Date(Date.now() + 1000),
//   });
//   res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};
export const download = async (req: Request, res: Response) => {
//   res.cookie('token', 'logout', {
//     httpOnly: true,
//     expires: new Date(Date.now() + 1000),
//   });
//   res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};


  
//   app.post('/upload', upload.single('file'), (req, res) => {
//     // Handle file upload
//     // Store the uploaded file in the database
//   });
  
//   app.get('/download/:fileId', (req, res) => {
//     // Handle file download
//     // Retrieve the requested file from the database and send it as a response
//   });
  
//   app.post('/create-folder', (req, res) => {
//     // Handle folder creation
//     // Create a new folder in the database
//   });