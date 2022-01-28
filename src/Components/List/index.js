import React, {memo, useEffect, useState} from 'react';
import {ListCell} from './shared/ListCell';
import {createStackNavigator} from '@react-navigation/stack';
import styled from 'styled-components';

import AddParkingLot from './AddParkingLot';
import {useDispatch, useSelector} from 'react-redux';
import {
  currentParkingLotSelector,
  myParkingLotSelector,
  workingParkingLotSelector,
} from '@store/selectors/parkingLotSelector';
import {useNavigation} from '@react-navigation/native';
import {getAllParkingLotsAction} from '@store/actionTypes';
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
  margin-bottom: -50px;
`;
const SearchBar = styled.TextInput`
  height: 45px;
  border-bottom-width: 1px;
  background-color: white;
  padding: 10px;
  font-size: 17px;
  border-color: #dddddd;
`;

const List = ({}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const myParkingLots = useSelector(myParkingLotSelector);
  const workingParkingLots = useSelector(workingParkingLotSelector);

  const parkingLot = useSelector(currentParkingLotSelector);

  useEffect(() => {
    dispatch(getAllParkingLotsAction());
  }, [dispatch]);

  return (
    <SafeArea>
      <Container>
        <Overview parkingLot={parkingLot} />
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
