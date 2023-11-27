import { Router } from "express";
import { RealmRoals, keycloakAuthMiddleware, requireRolesMiddleware } from "@promentor-app/shared-lib";

import studentRouter from "./student-routes";
import lecturerRouter from "./lecturer-routes";
import resourceManagerRouter from "./resource-manager-routes";
import groupRouter from "./group-routes";
import testRouter from "./test-routes";

const router = Router();

router.use("/test", testRouter);

// kyecloak auth middleware
router.use(keycloakAuthMiddleware);

router.use("/students", requireRolesMiddleware([RealmRoals.RESOURCES_MANAGEMENT, RealmRoals.ADMIN]), studentRouter);
router.use("/lecturers", requireRolesMiddleware([RealmRoals.RESOURCES_MANAGEMENT, RealmRoals.ADMIN]), lecturerRouter);
router.use("/resource-managers", requireRolesMiddleware([RealmRoals.ADMIN]), resourceManagerRouter);
router.use("/groups", requireRolesMiddleware([RealmRoals.RESOURCES_MANAGEMENT, RealmRoals.ADMIN]), groupRouter);

export default router;
