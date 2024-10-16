import { Request } from 'express';
import { UserData } from '../../src/types/Data.types';

declare module 'express' {
  interface Request {
    user?: UserData;
  }
}