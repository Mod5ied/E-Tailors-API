import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Student } from "../entity/student.entity";
import { IRepo, IReqBody } from "./interface.repo";

export class StudentsRepository implements IRepo<Student> {
  public async uploadOne(body: IReqBody) {
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
    await repository.update({ id: id }, { firstName: payload.firstName });
    return repository.findOneBy({ id: id });
  }
  public async deleteOne(id: number): Promise<DeleteResult | null> {
    const repository: Repository<Student> = AppDataSource.getRepository(Student);
    const res = repository.delete({ id: id });
    if((await res).affected === 0) return null
    return res;
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
