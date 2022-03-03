import {Fee} from '@services/membershipServices';

export type RegisterData = {
  officialId: string;
  fullName: string;
  phoneNumber: string;
  password: string;
  address: string;
  name: string;
  spaceCount: number;
  defaultFee: Fee;
};
