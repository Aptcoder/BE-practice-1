import express, { Application, Request, Response } from 'express';
import { setupUserRoutes } from './user.routes';
import { setupMiscRoutes } from './misc.router';
import { setupTeamRoutes } from './team.routes';
import { setupFixtureRoutes } from './fixture.router';
import Container from 'typedi';
import { RateLimiter } from '../../middlewares/rate_limiter';

type IContainer = typeof Container 
export const setupRoutes = (Container: IContainer) =>{
  const rateLimiterService = Container.get(RateLimiter)
  const apiRouter = express.Router();

  apiRouter.use(rateLimiterService.limit({
    maxRequests: 3,
    window: 5
  }))
  
  apiRouter.get('/healthcheck', (req: Request, res: Response) => res.send({
  message: "I'm alive!"
  }));

  apiRouter.use('/teams', setupTeamRoutes(Container))
  apiRouter.use('/fixtures', setupFixtureRoutes(Container))

  apiRouter.use('/misc', setupMiscRoutes(Container));
  apiRouter.use('/users', setupUserRoutes(Container))

  return apiRouter

}
