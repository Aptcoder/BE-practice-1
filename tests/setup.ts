import { getConnection } from 'typeorm';
import initDb from '../src/loaders/db';
import { clearDb } from './fixtures/db.fixture';

require('ts-node').register({ transpileOnly: true });

const setup = async () => {
  await initDb();

  await clearDb();
  getConnection().close();
};

export default setup;
