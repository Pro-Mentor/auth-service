import express from "express";

import {
    unhandledRouteMiddleware,
    globalErrorHandleMiddleware,
    keycloakAuthMiddleware,
    requireAuthMiddleware,
    requirerolesMiddleware,
} from "@promentor-app/shared-lib";

import configApplicationMiddleware from "./middleware/application-middleware-config";

import helloRouter from "./routes/hello-routes";
import studentRouter from "./routes/student-routes";

const app = express();

// configer the application middlewares
configApplicationMiddleware(app);

// kyecloak auth middleware
app.use(keycloakAuthMiddleware);

// require auth middleware
app.use(requireAuthMiddleware);

app.use(requirerolesMiddleware(["user", "admin"]));

app.use("/hello", keycloakAuthMiddleware, helloRouter);

app.use("/api/v1/auth/students", studentRouter);

// unhandled routes middleware
app.use(unhandledRouteMiddleware);

// global error handler middleware
app.use(globalErrorHandleMiddleware);

export default app;
