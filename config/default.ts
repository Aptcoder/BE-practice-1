import dotenv from 'dotenv';

dotenv.config();

export default {
  port: 3000,
  jwtSecret: process.env.JWT_SECRET,
  database: {
    host: process.env.DB_HOST,
    port: 3306,
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'kredi'
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: 6379
  }
};
