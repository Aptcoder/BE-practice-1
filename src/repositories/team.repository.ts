import { nanoid } from 'nanoid';
import { In } from 'typeorm';
import { CreateTeamDTO } from '../utils/dtos/teams.dto';
import { ITeam, IUser } from '../utils/interfaces/entities.interfaces';
import { CustomRepository, IUserRepository } from '../utils/interfaces/repos.interfaces';
import User from '../entities/user.entity';
import Team from '../entities/team.entity';

export default class TeamRepository implements CustomRepository<ITeam> {

  async create(teamData: CreateTeamDTO) {
    const team = Team.create({
      ...teamData,
    });

    return team.save();
  }

  async findAll(): Promise<ITeam[]> {
      return Team.find({});
  }

  async findByIds(ids: number[]): Promise<ITeam[]> {
      const teams = await Team.find({
        where: { id: In(ids) }
      })
      return teams
    
    }

    async findById(id: string): Promise<ITeam | undefined> {
        return Team.findOne(id)
    }


    async update(team: ITeam, updates: Partial<ITeam>): Promise<ITeam> {
        Object.assign(team, updates)
        const updatedTeam = await Team.save(team as Team)
        return updatedTeam
    }

    async delete(team: ITeam): Promise<ITeam>{
        const deletedTeam = await Team.remove(team as Team);
        return deletedTeam
    }

}


