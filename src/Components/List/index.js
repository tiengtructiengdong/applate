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
import {ParkingLot} from '@store/reducers/parkingLotReducer';
import {Overview} from './shared/Overview';

const Stack = createStackNavigator();

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #172a3b;
`;
const Container = styled.View`
  flex: 1;
  background-color: #172a3b;
`;
const SearchBar = styled.TextInput`
  height: 45px;
  border-bottom-width: 1px;
  background-color: white;
  padding: 10px;
  font-size: 17px;
  border-color: #dddddd;
`;
const LabelArea = styled.View`
  margin-horizontal: 25px;
  padding-horizontal: 20px;
  height: 45px;
  padding-top: 15px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  overflow: hidden;
  background-color: #3e619b;
`;
const Label = styled.Text`
  font-weight: 400;
  font-size: 16px;
  color: ${props => props.color || 'white'};
`;
const SessionArea = styled.ScrollView`
  background-color: #344a5f;
  flex: 1;
  margin: 0px 25px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding-horizontal: 20px;
  margin-bottom: 90px;
`;

const List = ({}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const myParkingLots = useSelector(myParkingLotSelector);
  const workingParkingLots = useSelector(workingParkingLotSelector);

  const parkingLot = useSelector(currentParkingLotSelector);
  const activeSession = useSelector(activeSessionSelector);

  useEffect(() => {
    dispatch(getAllParkingLotsAction());
  }, [dispatch]);

  useEffect(() => {
    if (parkingLot !== {}) dispatch(getActiveSessionAction(parkingLot.Id));
  }, [dispatch, parkingLot]);

  return (
    <SafeArea>
      <Container>
        <Overview parkingLot={parkingLot} />
        <LabelArea>
          <Label>Current sessions</Label>
        </LabelArea>
        <SessionArea>
          {activeSession.map((customer, id) => (
            <Cell key={id} vehicle={customer} />
          ))}
        </SessionArea>
      </Container>
    </SafeArea>
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
