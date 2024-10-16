export type UserData = {
  id?: number;
  name: string;
  email: string;
  password: string;
  confirmEmailToken?: string | null;
}

export type EventType = {
  id?: number;
  name: string;
  description: string;
  date: Date;
  userId: number;
  location: string;
}

export type LoginResponse = {
  token: string;
  user: UserData;
}