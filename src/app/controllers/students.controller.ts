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
    const students = await this._repository.findAll();
    if (!students) return next(new HttpException(404, "No data was found", (res.locals.data = students)));
    return res.status(200).send(students);
    
  }

  public async getOneStudent(req: Request, res: Response, next: NextFunction, id: any): Promise<any> {
    const student = await this._repository.findSingle(id);
    if (!student) return next(new HttpException(404, "No user with that id", (res.locals.data = student)));
    return (res.locals.data = student), res.status(200).send(student), next();

  }

  public async uploadStudent(req: Request, res: Response, next: NextFunction): Promise<any> {
    const body: IReqBody = req.body;
    const student = await this._repository.uploadOne(body);
    if (!student) return next(new HttpException(400, `${student}`, student));
    return (res.locals.data = student), res.status(200).send(student), next();

  }

  public async updateStudent(req: Request, res: Response, next: NextFunction, id: any): Promise<any> {
    const body: IReqBody = req.body;
    const student = await this._repository.updateOne(id, body);
    if (!student) return next(new HttpException(400, `${student}`, student));
    return (res.locals.data = student), res.status(200).send(student), next();
  
  }

  public async deleteStudent(req: Request, res: Response, next: NextFunction, id: any): Promise<any> {
    const resp = await this._repository.deleteOne(id);
    if (!resp) return next(new HttpException(400, `No student with such id`, resp));
    //todo: improve on the response message.
    return (res.locals.data = resp), res.status(200).send(resp), next();

  }
}
