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
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true,
  
}));
app.use(cookieParser());

// application routes
app.use('/api', router)

const test = async (req: Request, res: Response) => {
    // Promise.reject()
    const a = "It's me abu hosain and server is running"
    res.send(a)
  }
  
app.get('/', test);

// global error handler
app.use(globalErrorHandler)

// not found route
app.use(notFound)

export default app;