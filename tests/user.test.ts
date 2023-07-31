import express from 'express';
import request from 'supertest';
import { init } from '../src/loaders';

describe('User tests', () => {
  const app = express();
  beforeAll(async () => {
    await init({ expressApp: app });
  });
  test('Create user', async () => {
    const res = await request(app).post('/api/users').send({
      email: 'sampleuser@gmail.com',
      firstName: 'Samuel',
      lastName: 'Sample',
      password: 'password'
    });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      status: 'success',
    });
  });

  test('Get all users', async () => {
    const res = await request(app).get('/api/users');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      status: 'success',
      data: expect.objectContaining({
        users: expect.arrayContaining([expect.objectContaining({
          email: expect.any(String)
        })])
      })
    });
  });
});
