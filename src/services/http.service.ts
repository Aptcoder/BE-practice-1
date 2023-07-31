import { Service } from 'typedi';
import axios from 'axios';
import { IHttpService } from '../utils/interfaces/services.interfaces';
import { APIError } from '../utils/errors';

@Service('http_service')
export default class HttpService implements IHttpService {
  async get(url: string) {
    const result = await axios.get(url);
    if (result.status !== 200) {
      throw new APIError('Something unexpected happened', 500);
    }
    return result.data;
  }
}
