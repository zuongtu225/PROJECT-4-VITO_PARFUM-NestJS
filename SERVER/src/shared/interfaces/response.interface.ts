import { IRole } from 'src/modules/role/interface/role.interface';

export interface IResponse {
  data: object | IRole[] | '';
  success: boolean;
  message: string;
}
