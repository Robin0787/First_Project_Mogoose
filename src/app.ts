"use strict";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundRoute from "./app/middlewares/notFoundRoute";
import router from "./app/routes";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// All Routes are here.
app.use("/api/v1", router);

// global error handler
app.use(globalErrorHandler);
// not found routes error
app.use(notFoundRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
