import axios, {AxiosRequestConfig} from 'axios';
import {
  responseInterceptor,
  errorInterceptor,
  requestInterceptor,
} from './Interceptor';
import moment from 'moment-timezone';

import {HOST} from '@constants/Config';
import {AuthState} from '@store/reducers/authReducer';

const mainAxios = axios.create({
  baseURL: HOST,
  validateStatus: function (status) {
    return status >= 200 && status <= 500 && status !== 401 && status !== 406;
  },
  timeout: 60000,
});

mainAxios.defaults.baseURL = '';
mainAxios.interceptors.response.use(responseInterceptor, errorInterceptor);
mainAxios.interceptors.request.use(requestInterceptor, errorInterceptor);

export enum AcceptType {
  json = 'application/json',
  formData = 'multipart/form-data',
  urlencode = 'application/x-www-form-urlencoded',
}

const defaultHeader = {
  Accept: AcceptType.json,
  'Content-Type': AcceptType.json,
  Timezone: moment.tz.guess(),
};

const formHeader = {
  Accept: AcceptType.formData,
  'Content-Type': AcceptType.formData,
  Timezone: moment.tz.guess(),
};

export class apiClient {
  config: AxiosRequestConfig;
  headers: any;

  constructor(auth?: AuthState) {
    if (auth) {
      const {token, id} = auth;
      const authHeader =
        token && token.length > 0 ? {Authorization: 'Bearer ' + token} : null;
      this.config = {};
      this.headers = {
        ...defaultHeader,
        ...authHeader,
        id,
      };
    } else {
      this.config = {};
      this.headers = {
        ...defaultHeader,
      };
    }
  }

  get = (url: string, body?: any, option?: any, baseUrl?: string) => {
    option = option || {};
    const {headers, ...rest} = option;
    if (baseUrl) {
      mainAxios.defaults.baseURL = baseUrl;
    }
    return mainAxios.get(url, {
      ...this.config,
      params: {
        ...body,
      },
      headers: {
        ...this.headers,
        ...headers,
      },
      ...rest,
    });
  };

  post = (url: string, body?: any, option?: any, baseUrl?: string) => {
    option = option || {};
    const {headers, ...rest} = option;
    if (baseUrl) {
      mainAxios.defaults.baseURL = baseUrl;
    }
    return mainAxios.post(url, body, {
      ...this.config,
      headers: {
        ...this.headers,
        ...headers,
      },
      ...rest,
    });
  };

  postForm = (url: string, body?: any, option?: any) => {
    option = option || {};
    const {headers, ...rest} = option;
    return mainAxios.post(url, body, {
      ...this.config,
      headers: {
        ...this.headers,
        ...formHeader,
        ...headers,
      },
      ...rest,
    });
  };

  delete = (url: string, body?: any, option?: any) => {
    option = option || {};
    const {headers, ...rest} = option;
    return mainAxios.delete(url, {
      ...this.config,
      headers: {
        ...this.headers,
        ...headers,
      },
      data: {
        ...body,
      },
      ...rest,
    });
  };

  putAvatar = (url: string, body?: any, option?: any) => {
    option = option || {};
    const {headers, ...rest} = option;
    return mainAxios.put(url, {
      ...this.config,
      params: {
        ...body,
      },
      headers: {
        ...this.headers,
        ...headers,
      },
      ...rest,
    });
  };

  put = (url: string, body?: any, option?: any, baseUrl?: string) => {
    option = option || {};
    const {headers, ...rest} = option;
    if (baseUrl) {
      mainAxios.defaults.baseURL = baseUrl;
    }
    return mainAxios.put(url, body, {
      ...this.config,
      headers: {
        ...this.headers,
        ...headers,
      },
      ...rest,
    });
  };
}
