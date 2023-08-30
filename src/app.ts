import express from "express";

import helloRouter from "./routes/hello-routes";

const app = express();

app.use(helloRouter);

export default app;
