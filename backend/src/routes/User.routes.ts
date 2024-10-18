import { Router, Request, Response } from 'express';
import UsersController from '../controllers/User.controller';
import { validateToken } from '../middlewares/validateLogin';

const userController = new UsersController();
const userRouter = Router();

userRouter.get('/users', (req: Request, res: Response) => userController.getAllUsers(req, res));
userRouter.post('/create-account', (req: Request, res: Response) => userController.createUser(req, res));
userRouter.post('/login', (req: Request, res: Response) => userController.findByEmail(req, res));
userRouter.put('/profile', validateToken, (req: Request, res: Response) => userController.updateProfileData(req, res));
userRouter.delete('/profile/:id', validateToken, (req: Request, res: Response) => userController.requestDeleteUser(req, res));

export default userRouter;