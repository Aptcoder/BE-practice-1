import { Router } from 'express';
import TeamController from '../../controllers/team.controller';
import { IContainer } from 'src/utils/types';
import { Auth } from '../../middlewares/auth';
import { RateLimiter } from '../../middlewares/rate_limiter';


export const setupTeamRoutes = (Container: IContainer) => {
    const teamRouter: Router = Router();
    const teamController = Container.get(TeamController);
    const authService = Container.get(Auth)
    const rateLimiterService = Container.get(RateLimiter)

    teamRouter.get(
    '/',
    authService.auth(),
    teamController.getTeams.bind(teamController)
    );

    teamRouter.post(
    '/',
    authService.auth(),
    teamController.createTeam.bind(teamController)
    );

    teamRouter.get(
    '/:teamId',
    teamController.getTeam.bind(teamController)
    );

    teamRouter.patch('/:teamId', authService.auth(), teamController.updateTeam.bind(teamController))

    teamRouter.delete('/:teamId', authService.auth(), teamController.deleteTeam.bind(teamController))

    return teamRouter
}

