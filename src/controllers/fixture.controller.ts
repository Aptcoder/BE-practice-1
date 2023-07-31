import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import { CreateFixtureDTO, CreateTeamDTO, GetFixtureParam, GetTeamParam, UpdateFixtureDTO, UpdateTeamDTO } from '../utils/dtos/teams.dto';
import { IFixtureService } from '../utils/interfaces/services.interfaces';
import { processError } from '../utils/helpers';
import validator from '../utils/decorators/validator';

@Service()
export default class FixtureController {
  constructor(@Inject('fixture_service') public fixtureService: IFixtureService) {
    this.fixtureService = fixtureService;
  }

  @validator({
    body: CreateFixtureDTO
  })
  public async createFixture(req: Request, res: Response, next: NextFunction) {
    const createFixtureDto: CreateFixtureDTO = req.body;
    try {
      const fixture = await this.fixtureService.createFixture(createFixtureDto);
      return res.status(201).send({
        message: 'Successfully created fixture',
        status: 'success',
        data: { fixture }
      });
    } catch (err: any) {
      return processError(res, err);
    }
  }


  async getFixtures(req: Request, res: Response){
    try {
        const fixtures = await this.fixtureService.getFixtures()
        return res.send({
          message: 'Fetched all fixtures',
          status: 'success',
          data: { fixtures }
        });
      } catch (err: any) {
        return processError(res, err);
      }
  }


  @validator({
    param: GetFixtureParam
  })
  async getFixture(req: Request, res: Response){
    try {
        const { fixtureId } = req.params
        const fixture = await this.fixtureService.getFixture(fixtureId)

        return res.send({
            message: 'Fetched fixture',
            status: 'success',
            data: { fixture }
        });

    } catch (err: any) {
        return processError(res, err);
      }
  }

  @validator({
    body: UpdateFixtureDTO,
    param: GetFixtureParam
  })
  async updateFixture(req: Request, res: Response){
    try {
        const { fixtureId } = req.params
        const updateFixtureDto: UpdateFixtureDTO = req.body
        const fixture = await this.fixtureService.updateFixture(fixtureId, updateFixtureDto)
        return res.send({
            message: 'Updated fixture',
            status: 'success',
            data: { fixture }
        });
    } catch(err: any){
        return processError(res, err)
    }
  }

  @validator({
    param: GetFixtureParam
  })
  async deleteFixture(req: Request, res: Response){
    try {
        const { fixtureId } = req.params
        const fixture = await this.fixtureService.deleteFixture(fixtureId)
        return res.send({
            message: 'Deleted fixture',
            status: 'success',
            data: { fixture }
        });
    } catch(err: any){
        return processError(res, err)
    }
  }
}
