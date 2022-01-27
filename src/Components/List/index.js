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

const Stack = createStackNavigator();

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;
const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
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
const Overview = styled.View``;

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
      <Container></Container>
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
