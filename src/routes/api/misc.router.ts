import { Router } from 'express';
import { IContainer } from 'src/utils/types';
import MiscController from '../../controllers/misc.controller';
import HttpService from '../../services/http.service';


export const setupMiscRoutes = (Container: IContainer) => {
  const miscRouter: Router = Router();

  Container.set({ id: 'http_service', type: HttpService });
  const miscController = Container.get(MiscController);

  miscRouter.get(
    '/entries',
    miscController.getPublicApiEntries.bind(miscController)
  );

  return miscRouter
}
