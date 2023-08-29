import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from auth service");
});

app.listen(port, () => {
    console.log(`Auth service is running on port ${port}`);
});
