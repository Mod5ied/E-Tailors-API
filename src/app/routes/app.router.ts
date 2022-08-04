import express, { Request, Response, NextFunction, Router } from "express";
import { studentsRouter } from "./students.router";

const router: Router = express.Router();
router.use("/students/", studentsRouter);

export const appRouter: Router = router;
