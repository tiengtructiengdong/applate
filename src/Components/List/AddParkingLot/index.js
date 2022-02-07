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
const PriceRow = styled.View`
  flex-direction: row;
  height: 30px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  align-content: center;
  overflow: hidden;
  margin-left: 38px;
  margin-right: 40px;
`;
const PricePicker = styled(Picker)`
  flex: 1;
  height: 30px;
  top: -93px;
  margin-horizontal: -7px;
`;
const PricePickerItem = styled(Picker.Item)`
  font-size: 14px;
`;
const PriceField = styled.TextInput`
  font-size: 17px;
  flex: 2;
  text-align: right;
  color: white;
`;
const PriceLabel = styled.Text`
  font-size: 16px;
`;

const hourValue = [...Array(24).keys()];
const minuteValue = [...Array(60).keys()];
const valueString = i => (
  <PricePickerItem
    label={i.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    })}
    value={i}
  />
);

const Screen = ({}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [spaceCount, setSpaceCount] = useState('');

  const [price, setPrice] = useState([]);
  const [mark, setMark] = useState([0, 0]);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const register = () => {
    dispatch(addParkingLotAction(address, name, parseInt(spaceCount)));
    navigation.goBack();
  };

  const renderTimePicker = mark => {
    const hour = Math.floor(mark);
    const minute = Math.round((mark - hour) * 60);

    return (
      <>
        <PricePicker selectedValue={hour}>
          {hourValue.map(valueString)}
        </PricePicker>
        <PriceLabel>:</PriceLabel>
        <PricePicker selectedValue={minute}>
          {minuteValue.map(valueString)}
        </PricePicker>
      </>
    );
  };

  const renderFrom = mark => {
    return renderTimePicker(mark);
  };
  const renderTo = mark => {
    return renderTimePicker(mark);
  };

  return (
    <Container>
      <Header
        bgColor={'#ffb500'}
        title={`What's your parking lot?`}
        goBack={() => navigation.goBack()}
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
        <Label>Price</Label>
        {[...Array(mark.length - 1).keys()].map(i => (
          <PriceRow>
            {renderFrom(mark[i])}
            <PriceLabel> to </PriceLabel>
            {renderTo(mark[i + 1])}
            <PriceField placeholder="Enter price" />
          </PriceRow>
        ))}

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
