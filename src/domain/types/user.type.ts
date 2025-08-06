export interface IUser {
  _id: string;
  email: string;
  name: string;
  password: string;
  role: string;
}

export interface IChangePassword{
    currentPassword: string,
     newPassword: string,
}