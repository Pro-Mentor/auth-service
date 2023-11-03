import { Router } from "express";
import { body } from "express-validator";
import { requestValidationMiddleware } from "@promentor-app/shared-lib";

import { createLecturer } from "../controllers/lecturer-controller";

const router = Router();

router.post(
    "/",
    [
        body("username").trim().isString().notEmpty().withMessage("username is required"),
        body("email").isEmail().normalizeEmail().withMessage("valid email is required"),
        body("firstName")
            .trim()
            .isString()
            .optional()
            .isLength({ min: 3 })
            .withMessage("Should have at least 3 characters"),
        body("lastName")
            .trim()
            .isString()
            .optional()
            .isLength({ min: 3 })
            .withMessage("Should have at least 3 characters"),
    ],
    requestValidationMiddleware,
    createLecturer
);

export default router;
