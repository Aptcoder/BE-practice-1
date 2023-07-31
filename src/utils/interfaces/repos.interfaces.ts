import { CreateUserDTO } from '../dtos/users.dto';
import { IUser } from './entities.interfaces';

export interface CustomRepository<T> {
    // findOne(query: any): Promise<T>;
    findById(id: string): Promise<T | undefined>;
    findAll(): Promise<T[]>
    findByIds(id: number[]): Promise<T[]>
    create(...args: object[]): Promise<T>
    findByEmail?(email: string): Promise<T| undefined>
    update(entity: any, update: Partial<T>): Promise<T>
    delete(entity: any): Promise<T>
}

export interface IUserRepository {
    create(createUserDto: CreateUserDTO): Promise<IUser>
    findAll(): Promise<IUser[]>
    findByIds(ids: number[]): Promise<IUser[]>
    findByEmail(email: string): Promise<IUser | undefined>
}



