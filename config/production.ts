import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  dbUri: process.env.DATABASE_URL,
  dbName: 'kredi',
  jwtSecret: process.env.JWT_SECRET,
  dbSync: false,
};
