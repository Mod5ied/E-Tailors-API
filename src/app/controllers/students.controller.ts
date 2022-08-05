import { Request, Response, NextFunction } from "express";
import { IRepo, IReqBody } from "../repositories";
import { Student } from "../entity/student.entity";
import { HttpException } from "../../utils/errors/errorParser";

export class StudentsController {
  private readonly _repository: IRepo<Student>;

  constructor(repository: IRepo<Student>) {
    this._repository = repository;
  }

  public async getAllStudents(req: Request, res: Response, next: NextFunction): Promise<any> {
    return this._repository
      .findAll()
      .then((student: any) => {
        // its vital to log a newly created resource, should an operation fail then this would be a gold-mine.
        if (!student) return next(new HttpException(404, "No data was found", student));
        return res.status(200).send(student);
      })
      .catch((error: any) => {
        next(new HttpException(404, `${error.message}`, (res.locals.data = error.message)));
      });
  }

  public async getOneStudent(req: Request, res: Response, next: NextFunction, id: any): Promise<any> {
    return this._repository
      .findSingle(id)
      .then((student: any) => {
        if (!student)
          return next(new HttpException(404, "No user with that id", (res.locals.data = student)));
        return res.status(200).send(student);
      })
      .catch((error: any) => next(new HttpException(404, `${error.message}`, error)));
  }

  public async uploadStudent(req: Request, res: Response, next: NextFunction): Promise<any> {
    const body: IReqBody = req.body;
    return this._repository
      .uploadOne(body)
      .then((student) => {
        (res.locals.data = student), res.status(200).send(student);
        next();
      })
      .catch((error: any) => next(new HttpException(404, `${error.message}`, error)));
  }

  public async updateStudent(req: Request, res: Response, next: NextFunction, id: any): Promise<any> {
    const body: IReqBody = req.body;
    return this._repository
      .updateOne(id, body)
      .then((student) => {
        if (!student) return next(new HttpException(400, `${student}`));
        (res.locals.data = student), res.status(200).send(student);
        next();
      })
      .catch((error: any) => next(new HttpException(404, `${error.message}`, error)));
  }

  public async deleteStudent(req: Request, res: Response, next: NextFunction, id: any): Promise<any> {
    return this._repository
      .deleteOne(id)
      .then((resp) => {
        if (!resp) return next(new HttpException(400, `No student with such id`, resp));
        //todo: improve on the response message.
        (res.locals.data = resp), res.status(200).send(resp);
        next();
      })
      .catch((error) => next(new HttpException(404, `${error.message}`, error)));
  }
}
