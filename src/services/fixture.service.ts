import { Service, Inject } from 'typedi';
import _ from 'lodash';
import { IFixtureService, ITeamService } from '../utils/interfaces/services.interfaces';
import { AuthUserDto } from '../utils/dtos/users.dto';
import {  CreateFixtureDTO, UpdateFixtureDTO } from '../utils/dtos/teams.dto';
import { IFixture, ITeam,  } from '../utils/interfaces/entities.interfaces';
import { CustomRepository } from '../utils/interfaces/repos.interfaces';
import { APIError, ConflictError, NotFoundError } from '../utils/errors';

interface UpdateFixtureData extends UpdateFixtureDTO {
    homeTeam?: ITeam,
    awayTeam?: ITeam
}

@Service('fixture_service')
export default class FixtureService implements IFixtureService {
  constructor(@Inject('fixture_repository') public fixtureRepository: CustomRepository<IFixture>, @Inject('team_service') public teamService: ITeamService) {
    this.fixtureRepository = fixtureRepository;
  }

  async createFixture(createFixtureDto: CreateFixtureDTO): Promise<IFixture> {
    const homeTeam = await this.teamService.getTeam(createFixtureDto.homeTeamId);
    const awayTeam = await this.teamService.getTeam(createFixtureDto.awayTeamId)

    return this.fixtureRepository.create({
      ...createFixtureDto,
    });
  }

  async getFixtures(): Promise<IFixture[]> {
    return this.fixtureRepository.findAll();
  }

  async getFixture(id: string): Promise<IFixture> {
      const fixture = await this.fixtureRepository.findById(id)
      if(!fixture){
        throw new NotFoundError('Fixture not found')
      }
      return fixture
  }

  async updateFixture(fixtureId: string, updateData: UpdateFixtureDTO): Promise<IFixture> {
        const fixture = await this.getFixture(fixtureId)

        const newUpdateData: UpdateFixtureData = {
            ...updateData
        }

        if(updateData.homeTeamId){
            const homeTeam = await this.teamService.getTeam(updateData.homeTeamId)
            newUpdateData.homeTeam = homeTeam
        }

        if(updateData.awayTeamId){
            const awayTeam = await this.teamService.getTeam(updateData.awayTeamId)
            newUpdateData.awayTeam = awayTeam
        }

        return this.fixtureRepository.update(fixture, newUpdateData);
  }

  async deleteFixture(fixtureId: string): Promise<IFixture> {
        const fixture = await this.getFixture(fixtureId)
        return this.fixtureRepository.delete(fixture)
  }

}
