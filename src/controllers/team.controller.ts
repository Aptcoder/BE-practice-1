import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import { CreateTeamDTO, GetTeamParam, UpdateTeamDTO } from '../utils/dtos/teams.dto';
import { ITeamService, IUserService } from '../utils/interfaces/services.interfaces';
import { processError } from '../utils/helpers';
import validator from '../utils/decorators/validator';
import { UserRole } from '../entities/user.entity';

@Service()
export default class TeamController {
  constructor(@Inject('team_service') public teamService: ITeamService) {
    this.teamService = teamService;
  }

  @validator({
    body: CreateTeamDTO
  })
  public async createTeam(req: Request, res: Response, next: NextFunction) {
    const createTeamDto: CreateTeamDTO = req.body;
    try {
      const user = await this.teamService.createTeam(createTeamDto);
      return res.status(201).send({
        message: 'Successfully created team',
        status: 'success',
        data: { user }
      });
    } catch (err: any) {
      return processError(res, err);
    }
  }


  async getTeams(req: Request, res: Response){
    try {
        const teams = await this.teamService.getTeams()
        return res.send({
          message: 'Fetched all teams',
          status: 'success',
          data: { teams }
        });
      } catch (err: any) {
        return processError(res, err);
      }
  }


  @validator({
    param: GetTeamParam
  })
  async getTeam(req: Request, res: Response){
    try {
        const { teamId } = req.params
        const team = await this.teamService.getTeam(teamId)

        return res.send({
            message: 'Fetched team',
            status: 'success',
            data: { team }
        });

    } catch (err: any) {
        return processError(res, err);
      }
  }

  @validator({
    body: UpdateTeamDTO,
    param: GetTeamParam
  })
  async updateTeam(req: Request, res: Response){
    try {
        const { teamId } = req.params
        const updateTeamDto: UpdateTeamDTO = req.body
        const team = await this.teamService.updateTeam(teamId, updateTeamDto)
        return res.send({
            message: 'Updated team',
            status: 'success',
            data: { team }
        });
    } catch(err: any){
        return processError(res, err)
    }
  }

  @validator({
    param: GetTeamParam
  })
  async deleteTeam(req: Request, res: Response){
    try {
        const { teamId } = req.params
        const team = await this.teamService.deleteTeam(teamId)
        return res.send({
            message: 'Deleted team',
            status: 'success',
            data: { team }
        });
    } catch(err: any){
        return processError(res, err)
    }
  }
}
