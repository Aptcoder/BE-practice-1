import User from "../entities/user.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import Fixture from "../entities/fixture.entity";
import Team from "../entities/team.entity";

export default class CreateFixtures implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      await factory(Fixture)().map(async (fixture: Fixture) => {
        const teams: Team[] = await factory(Team)().createMany(2)
        fixture.awayTeamId = teams[0].id
        fixture.homeTeamId = teams[1].id
        return fixture
      }).createMany(5)
    }
  }



