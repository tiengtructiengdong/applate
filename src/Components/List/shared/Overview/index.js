import React from 'react';
import styled from 'styled-components';
import Svg, {LinearGradient} from 'react-native-svg';
import {PieChart} from 'react-native-chart-kit';

import Icon from 'react-native-vector-icons/Ionicons';

const BG = styled.View`
  background-color: #344a5f;
  height: 240px;
  margin: 30px 30px;
  border-radius: 15px;
`;
const Select = styled.TouchableOpacity`
  flex-direction: row;
  margin: 25px 38px 15px 25px;
  align-items: center;
`;
const Name = styled.Text`
  font-weight: 600;
  font-size: 25px;
  color: white;
  padding-right: 5px;
`;
const ChartArea = styled.View`
  width: 130px;
  height: 130px;
  margin-left: 20px;
  justify-content: center;
`;
const ChartOverlay = styled.View`
  position: absolute;
  background-color: #344a5f;
  width: 115px;
  height: 115px;
  border-radius: 70px;
  align-self: center;
  justify-content: center;
  align-items: center;
`;
const VehicleCount = styled.Text`
  font-weight: 700;
  font-size: 25px;
  color: ${props => props.color || 'white'};
`;
const Label = styled.Text`
  font-weight: 500;
  font-size: 15px;
  color: ${props => props.color || 'white'};
`;

export function Overview({parkingLot}) {
  const data = [
    {
      population: 400,
      color: '#1de48b',
    },
    {
      population: 20,
      color: '#00000030',
    },
  ];
  return (
    <BG>
      <Select>
        <Name adjustsFontSizeToFit numberOfLines={1}>
          {parkingLot.Name}
        </Name>
        <Icon name="chevron-down" size={20} color="white" />
      </Select>
      <ChartArea>
        <PieChart
          data={data}
          width={160}
          height={160}
          chartConfig={{
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            useShadowColorFromDataset: false, // optional
          }}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'25'}
          center={[0, 0]}
          absolute
          hasLegend={false}
        />
        <ChartOverlay>
          <VehicleCount color="#1de48b">400</VehicleCount>
          <Label>Vehicles</Label>
        </ChartOverlay>
      </ChartArea>
    </BG>
  );
}
