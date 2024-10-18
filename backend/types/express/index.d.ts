import { Request } from 'express';
import { UserData } from '../../src/types/Data.types';

type User = {
} & UserData;

declare module 'express' {
  interface Request {
    user?: User;
  }
}