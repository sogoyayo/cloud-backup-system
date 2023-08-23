import express, { NextFunction, Request, Response, Application, ErrorRequestHandler  } from 'express';
import { Server } from 'http';
import bodyParser from 'body-parser';
import { config } from "dotenv";


/*====================All Routes====================*/
import authRouter from './routes/authRoutes';


config();

const app: Application = express();
const port: Number = Number(process.env.PORT)|| 5000;


// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
// });
  
app.use(express.json());
// app.use(
//     cors({
//         origin: '*',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     }),
// );
// app.use(logger('dev'));
// app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());



app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello there. It is yayo. Cool it worked");
});




app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/users', userRouter);



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