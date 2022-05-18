import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import styled from 'styled-components';

import {useDispatch, useSelector} from 'react-redux';
import {getAllParkingLotsAction, loginAction} from '@store/actionTypes';
import {currentParkingLotSelector} from '@store/selectors/parkingLotSelector';
import AddParkingLot from '@components/List/AddParkingLot';
import Register from './Register';
import {createStackNavigator} from '@react-navigation/stack';
import {tabNavigationSelector} from '@store/selectors/authSelector';
import Scan from '@components/Scan';

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: #121212;
`;
const Logo = styled.Image`
  height: 80px;
  align-self: center;
  resize-mode: contain;
  margin-bottom: 30px;
`;
const FieldArea = styled.KeyboardAvoidingView`
  align-self: center;
  justify-content: center;
  margin-horizontal: 30px;
  width: 250px;
  margin-top: 50px;
`;
const Label = styled.Text`
  font-size: 16px;
  color: white;
  font-weight: 700;
`;
const Input = styled.TextInput`
  height: 45px;
  font-size: 18px;
  border-radius: 5px;
  background-color: #424242;
  padding: 10px;
  margin-top: 6px;
  margin-bottom: 16px;
  color: white;
`;
const ButtonLabel = styled(Label)`
  color: black;
`;
const Button = styled.TouchableOpacity`
  background-color: #ffb500;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;
const ButtonArea = styled.View`
  height: 45px;
  flex-direction: row;
  margin-top: 10px;
`;
const ButtonSpace = styled.View`
  width: 10px;
`;
const Auth = ({}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const dispatch = useDispatch();

  // MAIN STACK

  const login = () => {
    dispatch(loginAction(username, password));
  };

  return (
    <Container>
      <FieldArea>
        <Logo source={require('@icon/360_black.png')} />
        <Label>Phone number or ID</Label>
        <Input
          keyboardType="numeric"
          onChangeText={text => setUsername(text)}
        />
        <Label>Password</Label>
        <Input
          onChangeText={text => setPassword(text)}
          secureTextEntry
          onSubmitEditing={login}
          returnKeyType="go"
        />

        <ButtonArea>
          <Button onPress={login}>
            <ButtonLabel>Login</ButtonLabel>
          </Button>
          <ButtonSpace />
          <Button onPress={() => navigation.navigate('Register')}>
            <ButtonLabel>Register</ButtonLabel>
          </Button>
        </ButtonArea>
      </FieldArea>
    </Container>
  );
};

const AuthStack = ({}) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Auth" component={Scan} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="AddParkingLot" component={AddParkingLot} />
    </Stack.Navigator>
  );
};

export default React.memo(AuthStack);
