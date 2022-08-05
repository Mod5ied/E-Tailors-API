import { Request, Response, NextFunction } from "express";
import { IRepo, IReqBody } from "../repositories/";
import { Student } from "../entity/student.entity";

export class StudentsController {
  private readonly _repository: IRepo<Student>;

  constructor(repository: IRepo<Student>) {
    this._repository = repository;
  }

  public async getAllStudents(req: Request, res: Response, next: NextFunction): Promise<any> {
    return this._repository
      .findAll()
      .then((student: any) => res.status(200).send(student))
      .catch((error: any) => res.status(400).send({ error: error.message }));
    //errors can be send to a logger from here.
  }
  public async getOneStudent(req: Request, res: Response, next: NextFunction, id: any): Promise<any> {
    return this._repository
      .findSingle(id)
      .then((student: any) => res.status(200).send(student))
      .catch((error: any) => res.status(200).send({ error: error.message }));
    //errors can be send to a logger from here.
  }
  public async uploadStudent(req: Request, res: Response, next: NextFunction): Promise<any> {
    const body: IReqBody = req.body;
    return this._repository
      .uploadOne(body)
      .then((student) => res.status(200).send(student))
      .catch((error) => res.status(400).send({ error: error.message }));
  }
  public async updateStudent(req: Request, res: Response, next: NextFunction, id: any): Promise<any> {
    const body: IReqBody = req.body;
    return this._repository
      .updateOne(id, body)
      .then((student) => res.status(200).send(student))
      .catch((error) => res.status(400).send({ error: error.message }));
  }
  public async deleteStudent(req: Request, res: Response, next: NextFunction, id: any): Promise<any> {
    return this._repository
      .deleteOne(id)
      .then((resp) => res.status(200).send(resp))
      .catch((error) => res.status(400).send({ error: error.message }));
  }
}
