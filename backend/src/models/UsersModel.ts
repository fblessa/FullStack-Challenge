import UsersSequelize from "../database/models/Users.model";
import { IUserModel } from "../interfaces/IUsers";
import bcrypt from "bcryptjs";
import { UserData } from "../types/Data.types";

const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;

class UserModel implements IUserModel {
  private model = UsersSequelize;

  async createUser({ name, email, password }: UserData) {
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
    const user = await this.model.create({ name, email, password: hashedPassword });

    return user;
  }

  async getAllUsers() {
    const users = await this.model.findAll();

    return users;
  }

  async findByEmail(email: string) {
    const user = await this.model.findOne({ where: { email } });

    return user;
  }

  async updateUser(key: string, value: string, email: string) {
    const user = await this.model.update({ [key]: value }, { where: { email } });

    return user;
  }

  async deleteUser(id: number) {
    const user = await this.model.destroy({ where: { id } });

    return user;
  }
}

export default UserModel;