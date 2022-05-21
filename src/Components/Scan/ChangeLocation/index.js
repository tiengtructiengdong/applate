import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

import styled from 'styled-components';
import {Header} from '@components/Header';

import {useDispatch, useSelector} from 'react-redux';
import {
  addParkingLotAction,
  getAllParkingLotsAction,
  getParkAction,
  registerAction,
} from '@store/actionTypes';
import {Picker} from '@react-native-picker/picker';
import {
  currentParkingLotSelector,
  displayCountSelector,
  isMyParkSelector,
  myParkingLotSelector,
  spaceCountSelector,
  workingParkingLotSelector,
} from '@store/selectors/parkingLotSelector';

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
const ParkingLotSelect = styled.ScrollView`
  padding: 20px 25px;
  background-color: #121212;
`;
const ParkingLotSelectLabel = styled.Text`
  font-size: 12px;
  color: #808080;
  padding-vertical: 5px;
`;

const ParkingLotSelectItem = styled.TouchableOpacity`
  flex-direction: row;
  padding-vertical: 6px;
  justify-content: center;
  align-items: center;
`;
const ParkingLotSelectLeft = styled.View`
  flex: 1;
`;
const ParkingLotSelectNameLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.color || '#ffffff'};
`;
const ParkingLotSelectSubLabel = styled.Text`
  font-size: 12px;
  font-weight: 300;
  color: ${props => props.color || '#ffffff'};
`;
const ParkingLotSelectSpace = styled(ParkingLotSelectNameLabel)`
  width: 100px;
  text-align: right;
`;
const Screen = () => {
  const isMyPark = useSelector(isMyParkSelector);
  const displayCount = useSelector(displayCountSelector);
  const spaceCount = useSelector(spaceCountSelector);

  const myParkingLots = useSelector(myParkingLotSelector);
  const workingParkingLots = useSelector(workingParkingLotSelector);

  const parkingLot = useSelector(currentParkingLotSelector);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getAllParkingLotsAction());
  }, [dispatch]);

  const selectItem = parkId => {
    dispatch(getParkAction(parkId));
    navigation.goBack();
  };

  const renderSelectItem = (item, i) => (
    <ParkingLotSelectItem onPress={() => selectItem(item.Id)} key={`item_${i}`}>
      <ParkingLotSelectLeft>
        <ParkingLotSelectNameLabel
          color={item.Name === parkingLot.Name ? '#ffd834' : 'white'}>
          {item.Name}
        </ParkingLotSelectNameLabel>
        <ParkingLotSelectSubLabel
          color={item.Name === parkingLot.Name ? '#ffd834' : 'white'}>
          {item.Address}
        </ParkingLotSelectSubLabel>
      </ParkingLotSelectLeft>

      <ParkingLotSelectSpace
        color={item.Name === parkingLot.Name ? '#ffd834' : 'white'}>
        {Math.abs(item.SpaceCount - item.Count)}{' '}
        <ParkingLotSelectSubLabel>
          {item.SpaceCount != 0 ? 'left' : 'vehicles'}
        </ParkingLotSelectSubLabel>{' '}
      </ParkingLotSelectSpace>
    </ParkingLotSelectItem>
  );

  return (
    <Container>
      <Header
        bgColor={'#ffb500'}
        title={`Change working location`}
        goBack={() => navigation.goBack()}
      />
      <ParkingLotSelect>
        <ParkingLotSelectLabel>MY PARKS</ParkingLotSelectLabel>
        {myParkingLots.map(renderSelectItem)}
        <ParkingLotSelectLabel>WORKING PARKS</ParkingLotSelectLabel>
        {workingParkingLots.map(renderSelectItem)}
      </ParkingLotSelect>
    </Container>
  );
};

export default React.memo(Screen);
