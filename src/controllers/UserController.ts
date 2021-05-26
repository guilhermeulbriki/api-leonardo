import { Request, Response } from 'express';
import knex from '../database/connection';

class UserController {
  async list(request: Request, response: Response) {
    const users = await knex('users').select('*');

    return response.json(users);
  }

  async create(request: Request, response: Response) {
    const data = request.body;

    await knex('users').insert(data);

    return response.status(201).send();
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const data = request.body;

    const result = await knex('users').where('id', id).update(data);

    return response.json(result);
  }
}

export default UserController;
