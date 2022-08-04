export interface IReqBody {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  nin: number;
}

export interface IRepo<T> {
  findSingle(id: number): Promise<T | null>;
  findAll(): Promise<T[] | null>;
  uploadOne(arg: IReqBody): Promise<T | null>;
  updateOne(id: number, payload: IReqBody): Promise<T | null | void>;
  deleteOne(id: number): Promise<T | null>;
}
//recall that interfaces are used to shape an object.

// IRepo is an interface that reps a data type (repository type),
//  and it contains a method that when exec returns a promise of our expected type - T.
