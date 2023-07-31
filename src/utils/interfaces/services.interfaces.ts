/* eslint-disable no-unused-vars */

import { AuthUserDto, CreateUserDTO,  } from '../dtos/users.dto';
import { CreateFixtureDTO, CreateTeamDTO,  UpdateFixtureDTO,  UpdateTeamDTO } from '../dtos/teams.dto';
import { IFixture, ITeam, IUser } from './entities.interfaces';

export interface IUserService {
    auth(authDto: AuthUserDto): Promise<{ accessToken: string, user: Omit<IUser, 'password'> }>
    createUser(createUserDto: CreateUserDTO): Promise<IUser>
    getUsers(): Promise<IUser[]>
}

export interface ITeamService {
    createTeam(createTeamDto: CreateTeamDTO): Promise<ITeam>
    getTeams(): Promise<ITeam[]>
    updateTeam(teamId: string, updateData: UpdateTeamDTO): Promise<ITeam>
    getTeam(id: string): Promise<ITeam>
    deleteTeam(teamId: string): Promise<ITeam>
}

export interface IFixtureService {
    createFixture(createFixtureDto: CreateFixtureDTO): Promise<IFixture>
    getFixtures(): Promise<IFixture[]>
    updateFixture(fixtureId: string, updateData: UpdateFixtureDTO): Promise<IFixture>
    getFixture(id: string): Promise<IFixture>
    deleteFixture(teamId: string): Promise<IFixture>
}

export interface IHttpService {
    get(url: string): Promise<object>;
}
