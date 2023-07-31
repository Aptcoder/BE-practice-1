import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import { IHttpService } from '../utils/interfaces/services.interfaces';
import { processError } from '../utils/helpers';

@Service()
export default class MiscController {
  constructor(@Inject('http_service') public httpService: IHttpService) {
    this.httpService = httpService;
  }

  public async getPublicApiEntries(req: Request, res: Response, next: NextFunction) {
    try {
      const URL = 'https://api.publicapis.org/entries';
      const result = await this.httpService.get(URL);
      return res.status(201).send({
        message: 'Api call',
        status: 'success',
        data: { result }
      });
    } catch (err: any) {
      return processError(res, err);
    }
  }
}
