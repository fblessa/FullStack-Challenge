export interface UserDB {
  id?: number;
  name: string;
  email: string;
  password: string;
  confirmEmailToken?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EventDB {
  id?: number;
  name: string;
  description: string;
  date: Date;
  userId: number;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
}