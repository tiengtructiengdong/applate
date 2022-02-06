import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {tokenSelector} from '@store/selectors/authSelector';
import MainStack from '@components/MainStack';
import AuthStack from '@components/AuthStack';

const RootStack = ({}) => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);

  return token != null && token != undefined && token != '' ? (
    <MainStack />
  ) : (
    <AuthStack />
  );
};

export default React.memo(RootStack);
