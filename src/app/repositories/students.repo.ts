import { DeepPartial, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Student } from "../entity/student.entity";
import { IRepo, IReqBody } from "./interface.repo";

type retValue = Student[] | null;

export class StudentsRepository implements IRepo<Student> {
  public async uploadOne(body: IReqBody): Promise<Student | null> {
    const newStudent = new Student();
    newStudent.firstName = body.firstName;
    newStudent.lastName = body.lastName;
    newStudent.age = body.age;
    newStudent.nin = body.nin;

    const repository: Repository<Student> = AppDataSource.getRepository(Student);
    await repository.insert(newStudent);
    return repository.findOneBy({ id: newStudent.id });
  }
  public async updateOne(id: number, payload: IReqBody) {
    const repository: Repository<Student> = AppDataSource.getRepository(Student);
    if (!payload) return console.log("Send a data");
    await repository.update({ id: id }, { firstName: payload.firstName });
    return repository.findOneBy({ id: id }); 
  }
  public async deleteOne(id: number): Promise<Student> {
    throw new Error("Method not implemented.");
    // const repository: Repository<Student> = AppDataSource.getRepository(Student);
    // repository.remove()
  }
  public async findAll(): Promise<Student[]> {
    const repository: Repository<Student> = AppDataSource.getRepository(Student);
    return repository.find();
  }
  public async findSingle(id: number) {
    const repository: Repository<Student> = AppDataSource.getRepository(Student);
    return repository.findOneBy({ id: id });
  }
}
