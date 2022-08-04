import { Repository } from "typeorm";
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

    const repository: Repository<Student> = AppDataSource.getRepository(Student)
    await repository.save(newStudent)
    return repository.findOneBy({id: newStudent.id})
  }
  public async updateOne(): Promise<Student> {
    throw new Error("Method not implemented.");
  }
  public async deleteOne(): Promise<Student> {
    throw new Error("Method not implemented.");
  }
  public async findAll(): Promise<Student[]> {
    const repository: Repository<Student> = AppDataSource.getRepository(Student);
    return repository.find();
  }
  public async findSingle(id: number) { //: Promise<Student | null>
    const repository: Repository<Student> = AppDataSource.getRepository(Student);
    return repository.findOneBy({ id: id });
  }
}
