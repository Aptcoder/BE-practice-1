import { init } from '../services/providers/redis.cache';
import { RedisCache } from 'cache-manager-redis-yet'
import Container from 'typedi';
import UserRepository from '../repositories/user.respository';
import TeamRepository from '../repositories/team.repository';
import FixtureRepository from '../repositories/fixture.repository';
import UserService from '../services/user.service';
import TeamService from '../services/team.service';
import FixtureService from '../services/fixture.service';
import { Auth as AuthService } from '../middlewares/auth';
import { RateLimiter } from '../middlewares/rate_limiter';

export const initContainer = async () => {
    const redisCache: RedisCache = await init()

    // external services
    Container.set({ id: 'cache_service',  value: redisCache} )

    Container.set({ id: 'rate_limiter', type: RateLimiter})

    // Auth service
    Container.set({ id: 'auth_service', type: AuthService})

    // repositories
    Container.set({ id: 'user_repository', type: UserRepository})
    Container.set({ id: 'team_repository', type: TeamRepository });
    Container.set({ id: 'fixture_repository', type: FixtureRepository });


    // services
    Container.set({ id: 'user_service', type: UserService })
    Container.set({ id: 'team_service', type: TeamService });
    Container.set({ id: 'fixture_service', type: FixtureService });

    return Container
}