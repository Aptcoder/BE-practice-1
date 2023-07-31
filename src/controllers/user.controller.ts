import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import { AuthUserDto, CreateUserDTO } from '../utils/dtos/users.dto';
import { IUserService } from '../utils/interfaces/services.interfaces';
import { processError } from '../utils/helpers';
import validator from '../utils/decorators/validator';
import { UserRole } from '../entities/user.entity';

@Service()
export default class UserController {
  constructor(@Inject('user_service') public userService: IUserService) {
    this.userService = userService;
  }

  @validator({
    body: CreateUserDTO
  })
  public async createUser(req: Request, res: Response, next: NextFunction) {
    const createUserDto: CreateUserDTO = req.body;
    try {
      const user = await this.userService.createUser(createUserDto);
      return res.status(201).send({
        message: 'Successfully created user',
        status: 'success',
        data: { user }
      });
    } catch (err: any) {
      return processError(res, err);
    }
  }

  @validator({
    body: CreateUserDTO
  })
  public async createAdminUser(req: Request, res: Response, next: NextFunction) {
    const createUserDto: CreateUserDTO = req.body;
    try {
      const admin = await this.userService.createUser({...createUserDto, role: UserRole.ADMIN});
      return res.status(201).send({
        message: 'Admin created',
        status: 'success',
        data: { admin }
      });
    } catch (err: any) {
      return processError(res, err);
    }
  }

  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getUsers();
      return res.send({
        message: 'All users',
        status: 'success',
        data: { users }
      });
    } catch (err: any) {
      return processError(res, err);
    }
  }

  @validator({
    body: AuthUserDto
  })
  async authUser(req: Request, res: Response): Promise<void | Response> {
    try {
      const { email, password } = req.body;
      const { accessToken, user } = await this.userService.auth({
        email,
        password,
      });
      return res.send({
        status: 'success',
        message: 'User auth successful',
        data: {
          token: accessToken,
          user,
        },
      });
    } catch (err) {
      return processError(res, err);
    }
  }
}
