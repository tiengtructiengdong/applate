import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

import styled from 'styled-components';
import {Header} from '@components/Header';

import {useDispatch, useSelector} from 'react-redux';
import {registerAction} from '@store/actionTypes';

const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: #ffb500;
`;
const FieldArea = styled.ScrollView`
  align-self: center;
  flex: 1;
  width: 100%;
  padding-top: 50px;
  margin-bottom: -50px;
  background-color: white;
`;
const Label = styled.Text`
  font-size: 16px;
  margin-horizontal: 40px;
`;
const Input = styled.TextInput`
  height: 45px;
  font-size: 18px;
  border-radius: 5px;
  background-color: #eeeeee;
  padding: 10px;
  margin-vertical: 8px;
  margin-horizontal: 40px;
`;
const Button = styled.TouchableOpacity`
  background-color: #ffb500;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-horizontal: 40px;
`;
const ButtonArea = styled.View`
  height: 50px;
  flex-direction: row;
  margin-top: 25px;
`;
const Space = styled.View`
  height: 500px;
`;
const Screen = ({setToken}) => {
  const [officialId, setId] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRetype, setPasswordRetype] = useState('');

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const register = () => {
    dispatch(
      registerAction({
        officialId,
        fullName,
        phoneNumber,
        password,
      }),
    );
    navigation.goBack();
  };

  return (
    <Container>
      <Header
        bgColor={'#ffb500'}
        title={'Register new account'}
        goBack={() => navigation.goBack()}
      />
      <FieldArea>
        <Label>ID card number</Label>
        <Input onChangeText={text => setId(text)} />
        <Label>Full name</Label>
        <Input onChangeText={text => setFullName(text)} />
        <Label>Phone number</Label>
        <Input onChangeText={text => setPhoneNumber(text)} />
        <Label>Password</Label>
        <Input onChangeText={text => setPassword(text)} secureTextEntry />
        <Label>Retype password</Label>
        <Input onChangeText={text => setPasswordRetype(text)} secureTextEntry />

        <ButtonArea>
          <Button onPress={register}>
            <Label>Register</Label>
          </Button>
        </ButtonArea>
        <Space />
      </FieldArea>
    </Container>
  );
};

export default React.memo(Screen);
