import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapHttp';
import UserService from '../services/User.service';
import { IUserController } from '../interfaces/IUsers';

class UsersController implements IUserController {
  private userService = new UserService();

  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const { status , data } = await this.userService.createUser({ name, email, password });
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getAllUsers(req: Request, res: Response) {
    const {status, data} = await this.userService.getAllUsers();

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async findByEmail(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.userService.findByEmail(email, password);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async updateProfileData(req: Request, res: Response) {
    const { oldEmail, email, name, password } = req.body;
    const { status, data } = await this.userService.updateProfileData(oldEmail, email, name, password);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async requestDeleteUser(req: Request, res: Response) {
    const { id } = req.params;
    if (Number(id) === 1) return res.status(400).json({message: 'You cannot delete the admin user'});
    const { status, data } = await this.userService.requestDeleteUser(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}

export default UsersController;