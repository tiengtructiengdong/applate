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
  padding-top: 10px;
  margin-bottom: -50px;
  background-color: #121212;
`;
const BigLabel = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin-vertical: 20px;
  margin-horizontal: 40px;
  color: #ffb500;
`;
const Label = styled.Text`
  font-size: 14px;
  margin-horizontal: 40px;
  color: white;
`;
const Input = styled.TextInput`
  height: 45px;
  font-size: 18px;
  border-radius: 5px;
  background-color: #424242;
  padding: 10px;
  color: white;
  margin-vertical: 8px;
  margin-horizontal: 40px;
  border-width: 1px;
  border-color: ${props => (props.isRed === true ? 'red' : '#424242')};
`;
const Button = styled.TouchableOpacity`
  background-color: #ffb500;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-horizontal: 40px;
`;
const ButtonLabel = styled.Text`
  font-size: 16px;
`;
const ButtonArea = styled.View`
  height: 50px;
  flex-direction: row;
  margin-top: 25px;
`;
const Space = styled.View`
  height: 500px;
`;
const Register = ({setToken}) => {
  const [officialId, setId] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRetype, setPasswordRetype] = useState('');

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [spaceCount, setSpaceCount] = useState('');

  const [price, setPrice] = useState(0);
  const [priceMode, setPriceMode] = useState('fixed');

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const PASSWORD_LIMIT = 6;

  const register = () => {
    if (password == passwordRetype && password.length >= PASSWORD_LIMIT) {
      dispatch(
        registerAction(
          {
            officialId,
            fullName,
            phoneNumber,
            password,
            address,
            name,
            spaceCount: parseInt(spaceCount) || 0,
            defaultFee: {price},
          },
          () => {
            navigation.goBack();
          },
        ),
      );
    }
  };

  return (
    <Container>
      <Header
        bgColor={'#ffb500'}
        title={'Register new account'}
        goBack={() => navigation.goBack()}
      />
      <FieldArea>
        <BigLabel>Personal Information</BigLabel>
        <Label>ID card number</Label>
        <Input onChangeText={text => setId(text)} />
        <Label>Full name</Label>
        <Input onChangeText={text => setFullName(text)} />
        <Label>Phone number</Label>
        <Input onChangeText={text => setPhoneNumber(text)} />
        <Label>Password</Label>
        <Input onChangeText={text => setPassword(text)} secureTextEntry />
        <Label>Retype password</Label>
        <Input
          isRed={password != passwordRetype && password.length > 0}
          onChangeText={text => setPasswordRetype(text)}
          secureTextEntry
        />
        <BigLabel>Your parking lot</BigLabel>
        <Label>Location name</Label>
        <Input onChangeText={text => setName(text)} />
        <Label>Address</Label>
        <Input onChangeText={text => setAddress(text)} />
        <Label>Space count</Label>
        <Input
          keyboardType="numeric"
          onChangeText={text => setSpaceCount(text)}
        />
        <Label>Parking Price (VND)</Label>
        <Input onChangeText={text => setPrice(text)} />

        <ButtonArea>
          <Button
            onPress={register}
            disabled={
              password != passwordRetype || password.length < PASSWORD_LIMIT
            }>
            <ButtonLabel>Register</ButtonLabel>
          </Button>
        </ButtonArea>
        <Space />
      </FieldArea>
    </Container>
  );
};

export default React.memo(Register);
