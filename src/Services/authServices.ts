import {apiClient} from './Api';
import {HOST} from '@constants/Config';

import {RegisterData} from '@constants/Types';

// register
export function register(registerData: RegisterData) {
  return new apiClient().post(`${HOST}auth/register`, {
    ...registerData,
  });
}

// login
export function login(number: number, password: string) {
  return new apiClient().post(`${HOST}auth/login`, {
    number,
    password,
  });
}

// logout
export function logout(id: number) {
  return new apiClient().post(`${HOST}auth/logout`, {
    id,
  });
}
