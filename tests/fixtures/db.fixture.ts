/* eslint-disable import/prefer-default-export */
import { getManager } from 'typeorm';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

export async function clearDb() {
  const manager = getManager();
  await manager.query('DELETE FROM user');
}
