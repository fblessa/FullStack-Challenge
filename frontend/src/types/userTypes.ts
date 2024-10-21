export type UserType = {
  id?: number;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isDisabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export const initialUserState: UserType = {
  id: 0,
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  isDisabled: true,
};