const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

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




  
//   app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
//     // Handle file upload
//     // Store the uploaded file in the database
//   });
  
//   app.get('/download/:fileId', (req: Request, res: Response) => {
//     // Handle file download
//     // Retrieve the requested file from the database and send it as a response
//   });
  
//   app.post('/create-folder', (req: Request, res: Response) => {
//     // Handle folder creation
//     // Create a new folder in the database
//   });