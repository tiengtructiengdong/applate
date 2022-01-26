import {RegisterData} from '@constants/Types';
import {register, login, logout} from '@services/authServices';
import {loginSuccessAction, logoutSuccessAction} from '@store/actionTypes';
import {AnyAction} from 'redux';
import {put, takeLatest, all, call, select} from 'typed-redux-saga';
import {apiCallProxy} from './apiHelper';
import {parseRawDataResponse, popUp} from '@constants/Utils';

const registerSaga = function* (action: AnyAction) {
  const registerData: RegisterData = action.registerData;

  try {
    //yield* put(updateSessionAction({loading: true}));
    const response = yield* call(register, registerData);
    const data = parseRawDataResponse(response, true);
    if (data) {
      //yield* put(signUpSuccessAction(result, dataToken));
      console.log('yeet', data);
    } else {
      const errorMessage = response?.data?.error?.message;
      if (errorMessage) {
        popUp(errorMessage);
      }
    }
  } catch (error: any) {
    popUp(error.message);
  } finally {
    //yield* put(updateSessionAction({loading: false}));
  }
};

// const verifyOTPSaga = function* (action: any) {
//   const {
//     phoneNumber,
//     code,
//     routeParams,
//   }: {phoneNumber: string; code: string; routeParams: SignUpInfo} = action;
//   try {
//     yield* put(updateSessionAction({loading: true}));
//     const isSocial = yield* select(state => isSocialSelector(state));
//     const socialInfo = yield* select(state => userInfoSelector(state));
//     const response = yield* apiCallProxy(apiVerifyOTP, phoneNumber, code);
//     if (response && response?.data && response?.data.success) {
//       // navigate('ReferralCode');
//       isSocial
//         ? yield* put(signUpSocialAction(socialInfo))
//         : yield* put(signUpAction(routeParams));
//     } else {
//       const msgError = response?.data?.error?.message;
//       console.log('msgError>>>', msgError);
//       yield* put(addToastAction(msgError));
//     }
//   } catch (error: any) {
//     yield* put(addToastAction(error.message));
//   } finally {
//     yield* put(updateSessionAction({loading: false}));
//   }
// };

export default function* () {
  yield* all([takeLatest('REGISTER', registerSaga)]);
}
