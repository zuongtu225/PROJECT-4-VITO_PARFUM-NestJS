import { IUser } from 'src/modules/user/interface/user.interface';

export interface IResponseAuth {
  accessToken: string;
  success: boolean;
  data: IUser;
}
