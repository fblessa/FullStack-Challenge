import { IUserModel } from "../interfaces/IUsers";
import { UserData } from "../types/Data.types";
import { createToken, createEmailToken, verifyToken } from "../utils/jwt";
import { validatePassword, validateUser, validateConfirmEmailToken } from "../middlewares/validateLogin";
import { IUserService } from "../interfaces/IUsers";
import UserModel from "../models/UsersModel";
import bcrypt from 'bcryptjs';
import { ServiceResponse } from "../types/Service.response";
import UsersSequelize from "../database/models/Users.model";

const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;

class UserService implements IUserService {
  private userModel: IUserModel = new UserModel();

  async createUser({ name, email, password }: UserData) {
    try {
      const user = await this.userModel.findByEmail(email);
      const isValidUser = validateUser(email, password, name);
      if (isValidUser) return { status: isValidUser.status, data: isValidUser.data };

      if (user) return { status: 'CONFLICT', data: { message: 'E-mail já cadastrado.' } };

      await this.userModel.createUser({ name, email, password });

      return { status: 'CREATED', data: { message: 'Usuário criado com sucesso.' }};
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Erro ao criar usuário.' }};
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userModel.getAllUsers();
      return { status: 'SUCCESSFUL', data: users };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Erro ao buscar usuários.' }};
    }
  }

  async findByEmail(email: string, password: string) {
    try {
      if (!email || !password) return { status: 'BAD_REQUEST', data: { message: 'E-mail e senha são obrigatórios.' }};
      let isCorrectPassword;

      const userExists = await this.userModel.findByEmail(email);
      if (userExists) {
        isCorrectPassword = validatePassword(password, userExists.dataValues.password);
        if (!isCorrectPassword) return { status: 'UNAUTHORIZED', data: { message: 'Senha incorreta.' }};
      }

      if (!userExists || !isCorrectPassword) return { status: 'NOT_FOUND', data: { message: 'E-mail ou senha incorretos.' }};
      const token = createToken({ email, id: userExists.dataValues.id });

      return { status: 'SUCCESSFUL', data: { token, user: userExists.dataValues }};
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Erro ao buscar usuário.' }};
    }
  }

  async updateProfileData(oldEmail: string, email: string, name: string, password: string) {
    try {
      const user = await this.userModel.findByEmail(oldEmail);
      if (!user) return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado.' }};
      
      if (password.length > 8) {
        const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
        await this.userModel.updateUser('password', hashedPassword, oldEmail);
      }

      await this.userModel.updateUser('name', name, oldEmail);

      await this.userModel.updateUser('email', email, oldEmail);

      if (oldEmail !== email) {
        const confirmEmailToken = createEmailToken({ email });
        await this.userModel.updateUser('confirmEmailToken', confirmEmailToken, email);
      }
      return { status: 'SUCCESSFUL', data: { message: 'Perfil atualizado com sucesso!' } };
    } catch (error: any) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Erro ao atualizar perfil.' } };
    }
  }

  async requestDeleteUser(id: number) {
    const deletedUser = await this.userModel.deleteUser(id);

    if (deletedUser) return { status: 'SUCCESSFUL', data: { message: 'Usuário deletado com sucesso.' } };

    return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado.' } };
  }
  
}

export default UserService;