import { Service, Inject } from 'typedi';
import * as bcrypt from 'bcrypt';
import _ from 'lodash';
import config from 'config';
import jwt from 'jsonwebtoken';
import { IUserService } from '../utils/interfaces/services.interfaces';
import { AuthUserDto, CreateUserDTO } from '../utils/dtos/users.dto';
import { IUser } from '../utils/interfaces/entities.interfaces';
import { IUserRepository } from '../utils/interfaces/repos.interfaces';
import { APIError, ConflictError, NotFoundError } from '../utils/errors';
import { Cache } from 'cache-manager'

@Service('user_service')
export default class UserService implements IUserService {
  constructor(@Inject('user_repository') public userRepository: IUserRepository, @Inject('cache_service') private cache: Cache) {
    this.userRepository = userRepository;
  }

  private async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async createUser(createUserDto: CreateUserDTO): Promise<IUser> {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }
    const hashedPassword = await this.hashPassword(createUserDto.password);
    return this.userRepository.create({
      ...createUserDto,
      password: hashedPassword
    });
  }

  async getUsers(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  public async auth(authUserDto: AuthUserDto) {
    const { email: userEmail, password: userPassword } = authUserDto;
    const user = await this.userRepository.findByEmail(userEmail);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const comparePasswordResult = await this.comparePassword(
      userPassword,
      user.password
    );
    if (!comparePasswordResult) {
      throw new APIError('Invalid password', 401);
    }

    const { accessToken } = await this.generateToken(user);

    const result = await this.cache.set(accessToken, user.id, 60 * 60 * 1000)
    

    const userWithoutPasssword = _.omit(user, 'password');
    return { accessToken, user: userWithoutPasssword };
  }

  public async comparePassword(inputPass: string, password: string) {
    return bcrypt.compare(inputPass, password);
  }

  public async generateToken(user: IUser): Promise<{ accessToken: string }> {
    const payload = {
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    };
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        config.get<string>('jwtSecret'),
        {
          // expiresIn: '600000'
          expiresIn: '18000000',
        },
        (err: any, token) => {
          if (err) {
            return reject(err);
          }
          return resolve({ accessToken: token as string });
        }
      );
    });
  }
}
