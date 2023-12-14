import { IUser } from 'src/modules/user/interface/user.interface';

export class IAddress {
  address: string;
  phoneNumber: number;
  fullName: string;
  userId: IUser;
}
