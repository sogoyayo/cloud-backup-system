import express, { NextFunction, Request, Response, Application, ErrorRequestHandler  } from 'express';
import { Server } from 'http';
import bodyParser from 'body-parser';
import { config } from "dotenv";

config();

const app: Application = express();
const port: Number = Number(process.env.PORT)|| 5000;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    // Handle user signup
    // Store user information in the database
    res.send("Hello there. It is yayo. Cool it worked");
  });

//   Error middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    err.send({
        status: err.status || 500,
        message: err.message,
    })
}

app.use(errorHandler);


const server: Server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});