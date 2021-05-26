import express from 'express';

import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';

const routes = express.Router();

const userController = new UserController();
const authController = new AuthController();

routes.get('/', userController.list);
routes.post('/', userController.create);
routes.put('/:id', userController.update);

routes.post('/auth/', authController.create);

export default routes;
