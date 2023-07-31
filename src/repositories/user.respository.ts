import { nanoid } from 'nanoid';
import { In } from 'typeorm';
import { CreateUserDTO } from '../utils/dtos/users.dto';
import { IUser } from '../utils/interfaces/entities.interfaces';
import { IUserRepository } from '../utils/interfaces/repos.interfaces';
import User from '../entities/user.entity';

export default class UserRepository implements IUserRepository {
  async findByIds(ids: number[]): Promise<IUser[]> {
    const users = await User.find(
      {
        where: { id: In(ids) }
      }
    );
    return users;
  }

  async create(userData: CreateUserDTO) {
    const user = User.create({
      ...userData,
    });

    return user.save();
  }

  async findAll(): Promise<IUser[]> {
    return User.find({});
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await User.findOne({
      where: {
        email
      }
    });
    return user;
  }
}
