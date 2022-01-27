import React from 'react';
import styled from 'styled-components';
import Svg, {LinearGradient} from 'react-native-svg';

import Icon from 'react-native-vector-icons/Ionicons';

const BG = styled.View`
  background-color: #203a43;
  height: 200px;
  margin: 30px 30px;
  border-radius: 15px;
`;
const Select = styled.TouchableOpacity`
  flex-direction: row;
  margin: 25px 38px 25px 25px;
  align-items: center;
`;
const Name = styled.Text`
  font-weight: 600;
  font-size: 25px;
  color: white;
  padding-right: 5px;
`;

export function Overview({parkingLot}) {
  return (
    <BG>
      <Select>
        <Name adjustsFontSizeToFit numberOfLines={1}>
          {parkingLot.Name}
        </Name>
        <Icon name="chevron-down" size={20} color="white" />
      </Select>
    </BG>
  );
}
