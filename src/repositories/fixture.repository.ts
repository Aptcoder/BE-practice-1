import { nanoid } from 'nanoid';
import { In } from 'typeorm';
import { CreateFixtureDTO } from '../utils/dtos/teams.dto';
import { IFixture, ITeam } from '../utils/interfaces/entities.interfaces';
import { CustomRepository, IUserRepository } from '../utils/interfaces/repos.interfaces';
import User from '../entities/user.entity';
import Team from '../entities/team.entity';
import Fixture from '../entities/fixture.entity';

export default class FixtureRepository implements CustomRepository<IFixture> {

  async create(fixtureData: CreateFixtureDTO) {
    const fixture = Fixture.create({
      ...fixtureData,
    });

    return fixture.save();
  }

  async findAll(): Promise<IFixture[]> {
      return Fixture.find({
        relations: ["homeTeam", "awayTeam"]
      });
  }

  async findByIds(ids: number[]): Promise<IFixture[]> {
      const fixtures = await Fixture.find({
        where: { id: In(ids) }, relations: ["homeTeam", "awayTeam"]
      })
      return fixtures
    
    }

    async findById(id: string): Promise<IFixture | undefined> {
        return Fixture.findOne(id, {
            relations: ["homeTeam", "awayTeam"]
        })
    }


    async update(fixture: IFixture, updates: Partial<IFixture>): Promise<IFixture> {
        Object.assign(fixture, updates)
        const updatedFixture = await Fixture.save(fixture as Fixture)
        return updatedFixture
    }

    async delete(fixture: IFixture): Promise<IFixture>{
        const deletedFixture = await Fixture.remove(fixture as Fixture);
        return deletedFixture
    }

}


