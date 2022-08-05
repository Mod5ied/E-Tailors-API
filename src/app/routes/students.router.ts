import { use } from "../../utils";
import { Student } from "../entity/student.entity";
import { StudentsController } from "../controllers";
import { IRepo, StudentsRepository } from "../repositories";
import express, { Request, Response, NextFunction, Router } from "express";

const router: Router = express.Router();
const studentsRepo: IRepo<Student> = new StudentsRepository();
const controller: StudentsController = new StudentsController(studentsRepo);

//router here:
/* This universal error handler - { use() } does well to catch all errors in the app from the root of our app, 
   and efficiently sends them to tne error handlers, as well as logHandlers for proper and clean handling */

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  use(await controller.getAllStudents(req, res, next));
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  use(await controller.getOneStudent(req, res, next, req.params.id));
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  use(await controller.uploadStudent(req, res, next));
});

router.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
  use(await controller.updateStudent(req, res, next, req.params.id));
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  use(await controller.deleteStudent(req, res, next, req.params.id));
});

export const studentsRouter: Router = router;
