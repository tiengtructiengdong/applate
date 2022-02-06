import React, {memo, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import styled from 'styled-components';

import AddParkingLot from './AddParkingLot';
import Cell from './shared/Cell';
import {useDispatch, useSelector} from 'react-redux';
import {
  activeSessionSelector,
  currentParkingLotSelector,
  myParkingLotSelector,
  workingParkingLotSelector,
} from '@store/selectors/parkingLotSelector';
import {useNavigation} from '@react-navigation/native';
import {
  getActiveSessionAction,
  getAllParkingLotsAction,
} from '@store/actionTypes';

import {Overview} from './shared/Overview';

const Stack = createStackNavigator();

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #121212;
`;
const Container = styled.View`
  flex: 1;
  background-color: #121212;
`;
const SearchBar = styled.TextInput`
  height: 40px;
  border-bottom-width: 1px;
  font-size: 14px;
  margin-top: 5px;
  background-color: #1a1a1a;
  padding-horizontal: 25px;
  color: white;
`;
const LabelArea = styled.View`
  margin-horizontal: 25px;
  height: 78px;
  padding-top: 15px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  overflow: hidden;
  background-color: #ffc500;
`;
const Label = styled.Text`
  font-weight: 600;
  font-size: 17px;
  color: ${props => props.color || 'white'};
  padding-left: 25px;
`;
const SessionArea = styled.ScrollView`
  background-color: #1a1a1a;
  flex: 1;
  margin: 1px 25px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding-horizontal: 20px;
  margin-bottom: 90px;
`;
const Overlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  flex-direction: column-reverse;
  background-color: #00000000;
`;
const ParkingLotSelect = styled.View`
  background-color: white;
  height: 300px;
`;

const List = ({}) => {
  console.log('nofuckingwhy');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const myParkingLots = useSelector(myParkingLotSelector);
  const workingParkingLots = useSelector(workingParkingLotSelector);

  const parkingLot = useSelector(currentParkingLotSelector);
  const activeSession = useSelector(activeSessionSelector);

  useEffect(() => {
    dispatch(getAllParkingLotsAction());
  }, []);

  useEffect(() => {
    if (parkingLot?.Id) dispatch(getActiveSessionAction(parkingLot.Id));
  }, [parkingLot]);

  return (
    <>
      <SafeArea>
        <Container>
          {parkingLot !== undefined && parkingLot !== {} ? (
            <Overview parkingLot={parkingLot} />
          ) : (
            <></>
          )}
          <LabelArea>
            <Label color="black">Current sessions</Label>
            <SearchBar
              placeholderTextColor="#777777"
              placeholder="Search vehicle..."
            />
          </LabelArea>
          <SessionArea>
            {activeSession.map((customer, id) => (
              <Cell key={id} vehicle={customer} />
            ))}
          </SessionArea>
        </Container>
      </SafeArea>
      <Overlay>{/* <ParkingLotSelect></ParkingLotSelect> */}</Overlay>
    </>
  );
};

const ListStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="AddParkingLot" component={AddParkingLot} />
    </Stack.Navigator>
  );
};

export default memo(ListStack);
