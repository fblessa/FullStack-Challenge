import { UserData, LoginResponse } from "../types/Data.types";
import { ServiceResponse } from "../types/Service.response";
import UsersSequelize from "../database/models/Users.model";
import { Request, Response } from 'express';

export interface IUsers {
  id: number;
  name: string;
  email: string;
  password: string;
  confirmEmailToken: string | null;
}

export interface IUserModel {
  createUser({name, email, password }: UserData): Promise<UsersSequelize>;
  getAllUsers(): Promise<UsersSequelize[]>;
  findByEmail(email: string): Promise<UsersSequelize | null>;
  updateUser(key: string, value: string, email: string): Promise<[affectedCount: number]>;
  deleteUser(id: number): Promise<number>;
}

export interface IUserService {
  createUser({name, email, password }: UserData): Promise<ServiceResponse<UserData>>;
  findByEmail(email: string, password: string): Promise<ServiceResponse<LoginResponse>>;
  getAllUsers(): Promise<ServiceResponse<UsersSequelize[]>>;
  updateProfileData(oldEmail: string, email: string, name: string, password: string): Promise<ServiceResponse<number>>;
  requestDeleteUser(id:number): Promise<ServiceResponse<number>>;
}

export interface IUserController {
  createUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  getAllUsers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  findByEmail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  updateProfileData(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  requestDeleteUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}