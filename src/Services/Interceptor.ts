import {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
  // if (response.status === 404) {
  //   const customError = new Error('Error 404');
  //   return Promise.reject(customError);
  // }
  console.log('Response from API: ', response);
  return Promise.resolve(response);
};

export const errorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};

export const requestInterceptor = (config: AxiosRequestConfig) => {
  //console.log('REQUEST: ', config);
  return config;
};
