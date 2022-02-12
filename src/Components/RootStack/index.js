import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {tokenSelector} from '@store/selectors/authSelector';
import MainStack from '@components/MainStack';
import AuthStack from '@components/AuthStack';
import def from 'react-native-default-preference';
import {loginSuccessAction} from '@store/actionTypes';

const RootStack = ({}) => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);

  const getDef = async () => {
    try {
      const idStr = await def.get('id');
      const token = await def.get('token');

      if (idStr === undefined || token === undefined) {
        throw new Error('You must log in first.');
      }

      const id = parseInt(idStr);
      dispatch(loginSuccessAction({id, token}));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDef();
  }, [dispatch]);

  return token != null && token != undefined && token != '' ? (
    <MainStack />
  ) : (
    <AuthStack />
  );
};

export default React.memo(RootStack);
