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

app.get("/", async (req: Request, res: Response) => {
  Promise.reject();
  res.send("Hello World!");
});

// global error handler
app.use(globalErrorHandler);
// not found routes error
app.use(notFoundRoute);
export default app;
