//const {promisify} = require('util');
import {Alert} from 'react-native';

export const parseRawDataResponse = (response: any, resultOnly?: boolean) => {
  if (response) {
    let {data} = response;
    if (data) {
      const {result: resultInResponse} = data;
      if (resultInResponse) {
        return resultOnly === true ? resultInResponse : resultInResponse.data;
      }
    }
  }
  return undefined;
};

export const popUp = (msg: string) => {
  Alert.alert(msg, [
    {
      text: 'OK',
    },
  ]);
};

//const asyncQuery = (func) => promisify(func).bind(pool);
