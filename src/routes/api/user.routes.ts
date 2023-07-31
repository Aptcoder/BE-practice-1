import { Router } from 'express';
import Container from 'typedi';
import UserService from '../../services/user.service';
import UserController from '../../controllers/user.controller';
import UserRepository from '../../repositories/user.respository';
import { authUserBodySchema, createUserBodySchema } from '../../schemas/user.schemas';
import validateRequest from '../../middlewares/validator';

type IContainer = typeof Container 
export const setupUserRoutes = (container: IContainer) => {
  const userRouter: Router = Router();

  const userController = container.get(UserController);

  userRouter.get(
    '/',
    userController.getAllUsers.bind(userController)
  );

  userRouter.post(
    '/',
    userController.createUser.bind(userController)
  );

  userRouter.post(
    '/admins',
    userController.createAdminUser.bind(userController)
  );

  userRouter.post(
    '/auth',
    userController.authUser.bind(userController)
  );

  return userRouter
}


