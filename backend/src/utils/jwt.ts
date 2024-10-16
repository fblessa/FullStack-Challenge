import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

type PayloadType = {
  id: number,
  email: string,
};

type EmailTokenPayload = {
  email: string,
};

const JWT_CONFIG: SignOptions = {
  algorithm: 'HS256',
};

const createToken = (payload: PayloadType): string => jwt.sign(payload, JWT_SECRET, JWT_CONFIG);

const createEmailToken = (payload: EmailTokenPayload): string => jwt.sign(payload, JWT_SECRET, JWT_CONFIG);

const verifyToken = (token: string): PayloadType | EmailTokenPayload => jwt.verify(token, JWT_SECRET) as PayloadType | EmailTokenPayload;

export { createToken, verifyToken, createEmailToken, JWT_SECRET };