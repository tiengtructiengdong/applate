//const {promisify} = require('util');
import {Alert} from 'react-native';

export const parseRawDataResponse = (response: any, resultOnly?: boolean) => {
  return JSON.parse(response.request._response) || undefined;
};

export const popUp = (msg: string, subMsg?: string, onPress?: () => void) => {
  Alert.alert(msg, subMsg, [
    {
      text: 'OK',
      onPress: onPress,
    },
  ]);
};

export const errString = (code: number) =>
  `Request failed with status code ${code}`;

export const printTicket = (data: any) => {
  console.log('print ticket', data);

  return new Promise<void>((resolve, reject) => {
    resolve();
  });
};
//const asyncQuery = (func) => promisify(func).bind(pool);
