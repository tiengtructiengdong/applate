import React from 'react';
import styled from 'styled-components';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CurrentParkingLot = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  padding-right: 2px;
`;

export function ListHeader({bgColor = '#d1d1d1', onPress, title}) {
  return (
    <View style={[style.headerBg, {backgroundColor: bgColor}]}>
      <CurrentParkingLot onPress={onPress}>
        <Title>{title}</Title>
        <Icon name="chevron-down-outline" height={30} width={30} />
      </CurrentParkingLot>
    </View>
  );
}

const style = StyleSheet.create({
  headerBg: {
    height: 47,
    margin: 0,
  },
});
