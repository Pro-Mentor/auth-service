import express from "express";
import { json } from "body-parser";

import helloRouter from "./routes/hello-routes";
import studentRouter from "./routes/student-routes";
import unhandledRouteMiddleware from "./middleware/unhandled-route-middleware";
import globalErrorHandleMiddleware from "./middleware/global-error-handle-middleware";

const app = express();

app.use(json());

app.use("/hello", helloRouter);

app.use("/api/v1/students", studentRouter);

// unhandled routes middleware
app.use(unhandledRouteMiddleware);

// global error handler middleware
app.use(globalErrorHandleMiddleware);

export default app;
