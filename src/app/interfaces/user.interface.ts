export interface IUser {
  token: string;
  user: {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    founds: number;
  };
}
