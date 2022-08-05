import express, { Router } from "express";
import { use } from "../../utils";
import { saveLogs } from "../../utils/log/logHandler";
import { studentsRouter } from "./students.router";

const router: Router = express.Router();
/* This universal error handler - { use() } does well to catch all errors in the app from the root of our app, 
   and efficiently sends them to tne error handlers, as well as logHandlers for proper and clean handling */
router.use("/students/", [studentsRouter, use(saveLogs)]);

export const appRouter: Router = router;
