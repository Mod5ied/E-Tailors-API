import { Student } from "../entity/student.entity";
import { StudentsController } from "../controllers";
import { IRepo, StudentsRepository } from "../repositories";
import express, { Request, Response, NextFunction, Router } from "express";

const router: Router = express.Router();
const studentsRepo: IRepo<Student> = new StudentsRepository();
const controller: StudentsController = new StudentsController(studentsRepo);

//router here:
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  await controller.getAllStudents(req, res, next);
  // console.log("I did it!")
});
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  await controller.getOneStudent(req, res, next, id);
});
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  await controller.uploadStudent(req, res, next);
});
router.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  await controller.updateStudent(req, res, next, id);
});

export const studentsRouter: Router = router;
