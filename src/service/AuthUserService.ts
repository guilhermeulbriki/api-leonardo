import { response } from 'express';
import knex from 'knex';

interface User {
  password: string;
  name: string;
}

interface IAuthUserService {
  name: string;
  password: string;
}

class AuthUserService {
  public async execute({ name, password }: IAuthUserService) {
    const user = await knex<User>('users')
      .select('*')
      .where('name', name)
      .first();

    if (!user) {
      return response.status(404).json();
    }

    if (user && user!.password === password) {
      return response.json(user);
    }

    return response
      .status(404)
      .json({ message: 'Not found anyone with this params.' });
  }
}

export default AuthUserService;
