import { Router } from "express";
import { requirerolesMiddleware } from "@promentor-app/shared-lib";

import studentRouter from "./student-routes";
import lecturerRouter from "./lecturer-routes";
import resourceManagerRouter from "./resource-manager-routes";

const router = Router();

router.use("/students", requirerolesMiddleware(["resources-management", "admin"]), studentRouter);
router.use("/lecturers", requirerolesMiddleware(["resources-management", "admin"]), lecturerRouter);
router.use("/resource-managers", requirerolesMiddleware(["admin"]), resourceManagerRouter);

export default router;
