import { Request, Response } from 'express';
import knex from '../database/connection';

interface User {
  password: string;
  name: string;
}

class AuthController {
  async create(request: Request, response: Response) {
    const { name, password } = request.body;

    const user = await knex<User>('users')
      .select('*')
      .where('name', name)
      .first();

    if (user!.password === password) {
      return response.json(user);
    }

    return response.status(401).json({ message: 'User not found!' });
  }
}

export default AuthController;
