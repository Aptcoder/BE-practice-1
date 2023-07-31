import { Service, Inject } from 'typedi';
import * as bcrypt from 'bcrypt';
import _ from 'lodash';
import config from 'config';
import jwt from 'jsonwebtoken';
import { ITeamService } from '../utils/interfaces/services.interfaces';
import { AuthUserDto, CreateUserDTO,  } from '../utils/dtos/users.dto';
import {  CreateTeamDTO, UpdateTeamDTO } from '../utils/dtos/teams.dto';
import { ITeam, IUser } from '../utils/interfaces/entities.interfaces';
import { CustomRepository } from '../utils/interfaces/repos.interfaces';
import { APIError, ConflictError, NotFoundError } from '../utils/errors';

@Service('team_service')
export default class TeamService implements ITeamService {
  constructor(@Inject('team_repository') public teamRepository: CustomRepository<ITeam>) {
    this.teamRepository = teamRepository;
  }

  async createTeam(createTeamDto: CreateTeamDTO): Promise<ITeam> {
    return this.teamRepository.create({
      ...createTeamDto,
    });
  }

  async getTeams(): Promise<ITeam[]> {
    return this.teamRepository.findAll();
  }

  async getTeam(id: string): Promise<ITeam> {
      const team = await this.teamRepository.findById(id)
      if(!team){
        throw new NotFoundError('Team not found')
      }
      return team
  }

  async updateTeam(teamId: string, updateData: UpdateTeamDTO): Promise<ITeam> {
        const team = await this.getTeam(teamId)
        return this.teamRepository.update(team, updateData);
  }

  async deleteTeam(teamId: string): Promise<ITeam> {
        const team = await this.getTeam(teamId)
        return this.teamRepository.delete(team)
  }

}
