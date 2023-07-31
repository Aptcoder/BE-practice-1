import { Router } from 'express';
import FixtureController from '../../controllers/fixture.controller';
import { IContainer } from '../../utils/types';
import { auth, Auth } from '../../middlewares/auth';

export const setupFixtureRoutes = (Container: IContainer ) => {
    const fixtureRouter: Router = Router();


    const fixtureController = Container.get(FixtureController);
    const authService = Container.get(Auth)

    fixtureRouter.get(
    '/',
    fixtureController.getFixtures.bind(fixtureController)
    );

    fixtureRouter.post(
    '/',
    authService.auth(),
    fixtureController.createFixture.bind(fixtureController)
    );

    fixtureRouter.get(
    '/:fixtureId',
    fixtureController.getFixture.bind(fixtureController)
    );

    fixtureRouter.patch('/:fixtureId', authService.auth(), fixtureController.updateFixture.bind(fixtureController))

    fixtureRouter.delete('/:fixtureId', authService.auth(), fixtureController.deleteFixture.bind(fixtureController))

    return fixtureRouter
}
