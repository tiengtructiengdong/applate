import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

import styled from 'styled-components';
import {Header} from '@components/Header';

import {useDispatch, useSelector} from 'react-redux';
import {addParkingLotAction, registerAction} from '@store/actionTypes';
import {Picker} from '@react-native-picker/picker';

const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: #ffb500;
`;
const FieldArea = styled.View`
  align-self: center;
  flex: 1;
  width: 100%;
  padding-top: 50px;
  margin-bottom: -50px;
  background-color: #121212;
`;
const Label = styled.Text`
  font-size: 16px;
  margin-horizontal: 40px;
  color: white;
`;
const BlackLabel = styled(Label)`
  color: black;
`;
const Input = styled.TextInput`
  height: 45px;
  font-size: 18px;
  border-radius: 5px;
  background-color: #424242;
  color: white;
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
  height: ${props => props.height || 500}px;
`;
const PriceLabel = styled.Text`
  font-size: 17px;
  color: white;
  color: #ffb500;
  margin-horizontal: 40px;
`;

const Screen = ({forced}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [spaceCount, setSpaceCount] = useState('');

  const [price, setPrice] = useState(0);
  const [priceMode, setPriceMode] = useState('fixed');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const register = () => {
    dispatch(addParkingLotAction(address, name, parseInt(spaceCount)));
    navigation.goBack();
  };

  return (
    <Container>
      <Header
        bgColor={'#ffb500'}
        title={`What's your parking lot?`}
        goBack={forced == true ? () => navigation.goBack() : undefined}
      />
      <FieldArea>
        <Label>Location name</Label>
        <Input onChangeText={text => setName(text)} />
        <Label>Address</Label>
        <Input onChangeText={text => setAddress(text)} />
        <Label>Space count</Label>
        <Input
          keyboardType="numeric"
          onChangeText={text => setSpaceCount(text)}
        />
        <Space height={20} />
        <PriceLabel>Parking Price</PriceLabel>
        <Input onChangeText={text => setAddress(text)} />

        <ButtonArea>
          <Button onPress={register}>
            <BlackLabel>Add parking lot</BlackLabel>
          </Button>
        </ButtonArea>
        <Space />
      </FieldArea>
    </Container>
  );
};

export default React.memo(Screen);
