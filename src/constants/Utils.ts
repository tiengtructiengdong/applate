//const {promisify} = require('util');
import {Alert, Platform} from 'react-native';
import androidPrompt from 'react-native-prompt-android';

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

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export const prompt = (
  title: string,
  subtitle?: string,
  onSubmit?: (value: string) => void,
) => {
  if (isIOS) {
    Alert.prompt(title, subtitle, onSubmit);
  } else {
    androidPrompt(
      title,
      subtitle,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: onSubmit,
        },
      ],
      {
        //type: 'secure-text',
        cancelable: true,
        //defaultValue: 'test',
        //placeholder: 'placeholder',
      },
    );
  }
};
//const asyncQuery = (func) => promisify(func).bind(pool);
