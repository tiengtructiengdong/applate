import React, {memo} from 'react';
import DefaultPreference from 'react-native-default-preference';

import {Header} from '@components/Header';
import {ListCell} from './shared/ListCell';
import {createStackNavigator} from '@react-navigation/stack';
import styled from 'styled-components';

const Stack = createStackNavigator();

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #ffb500;
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

const List = ({}) => {
  return (
    <SafeArea>
      <Header bgColor={'#ffb500'} title={'Vehicles'} />
      <SearchBar placeholder={'Search vehicle...'} />
      <Container>
        <ListCell plate={'52N3-5656'} />
      </Container>
    </SafeArea>
  );
};

const ListStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="List" component={List} />
    </Stack.Navigator>
  );
};

export default memo(ListStack);
