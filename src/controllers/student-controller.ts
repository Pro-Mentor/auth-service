import { Request, Response } from "express";

const createStudent = (req: Request, res: Response) => {
    res.send("Hello from students");
};

const updateStudent = (req: Request, res: Response) => {
    res.send("Hello from students");
};

export { createStudent, updateStudent };
