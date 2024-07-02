import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import router from "./app/routes";
import notFound from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/globalErrorHandlers";
// import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app : Application = express();

// parser
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// application routes
app.use('/api', router)

const test = async (req: Request, res: Response) => {
    // Promise.reject()
    const a = "10"
    res.send(a)
  }
  
app.get('/', test);

// global error handler
app.use(globalErrorHandler)

// not found route
app.use(notFound)

export default app;