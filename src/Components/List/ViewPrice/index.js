import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

import styled from 'styled-components';
import {Header} from '@components/Header';

import {useDispatch, useSelector} from 'react-redux';
import {PriceEditor} from '../shared/PriceEditor';

const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: #ffb500;
`;
const FieldArea = styled.View`
  align-self: center;
  width: 100%;
  padding-top: 20px;
  background-color: #121212;
  flex-direction: row;
`;
const SelectorArea = styled.View`
  align-self: center;
  flex: 1;
  width: 100%;
  padding-horizontal: 20px;
  padding-top: 7px;
  padding-bottom: 25px;
  background-color: #121212;
`;
const Label = styled.Text`
  font-size: 16px;
  margin-left: 40px;
  align-self: center;
  color: white;
`;
const Input = styled.TextInput`
  height: 45px;
  flex: 1;
  font-size: 18px;
  border-radius: 5px;
  background-color: #424242;
  color: white;
  padding: 10px;
  margin-vertical: 8px;
  margin-horizontal: 40px;
`;

const Screen = ({}) => {
  const [name, setName] = useState('');

  const [price, setPrice] = useState([]);
  const [mark, setMark] = useState([]);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleChange = newSchedule => {
    console.log(newSchedule);
    setMark(newSchedule);
  };

  return (
    <Container>
      <Header
        bgColor={'#ffb500'}
        title={`Pricing`}
        goBack={() => navigation.goBack()}
      />
      <FieldArea>
        <Label>Price</Label>
        <Input onChangeText={text => setName(text)} />
      </FieldArea>
      <SelectorArea>
        <PriceEditor />
      </SelectorArea>
    </Container>
  );
};

export default React.memo(Screen);
