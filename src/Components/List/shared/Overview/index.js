import React from 'react';
import styled from 'styled-components';
import Svg, {LinearGradient} from 'react-native-svg';
import {PieChart} from 'react-native-chart-kit';

import Icon from 'react-native-vector-icons/Ionicons';

const BG = styled.View`
  background-color: #344a5f;
  height: 220px;
  margin: 20px 25px 30px;
  border-radius: 15px;
  padding-horizontal: 20px;
  padding-top: 20px;
`;
const Select = styled.TouchableOpacity`
  flex-direction: row;
  margin: 0px 38px 20px 0px;
  align-items: center;
`;
const Name = styled.Text`
  font-weight: 600;
  font-size: 22px;
  color: white;
  padding-right: 5px;
`;
const RowArea = styled.View`
  flex-direction: row;
  flex: 1;
`;
const Area = styled.View`
  align-items: center;
  flex: 1;
`;
const ChartArea = styled.View`
  width: 125px;
  height: 125px;
  margin-right: 5px;
  justify-content: center;
`;
const ChartOverlay = styled.View`
  position: absolute;
  background-color: #344a5f;
  width: 112px;
  height: 112px;
  border-radius: 70px;
  align-self: center;
  justify-content: center;
  align-items: center;
`;
const VehicleCount = styled.Text`
  font-weight: 700;
  font-size: 24px;
  color: ${props => props.color || 'white'};
`;
const Label = styled.Text`
  font-weight: 500;
  font-size: 14px;
  color: ${props => props.color || 'white'};
`;
const SmallLabel = styled(Label)`
  font-size: 13px;
`;
const SmallCount = styled(VehicleCount)`
  font-size: 20px;
`;

export function Overview({parkingLot}) {
  const today = new Date().getDate();
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
      <RowArea>
        <ChartArea>
          <PieChart
            data={data}
            width={150}
            height={150}
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
            <VehicleCount color="#1de48b">{parkingLot.SpaceCount}</VehicleCount>
            <Label>
              {parkingLot.SpaceCount != 0 ? 'Space left' : 'Motorbikes'}
            </Label>
          </ChartOverlay>
        </ChartArea>
        <Area>
          <RowArea>
            <Area>
              <SmallLabel>Customers</SmallLabel>
              <SmallCount>20</SmallCount>
            </Area>
            <Area>
              <SmallLabel color="#ea6a47">Ticket loss</SmallLabel>
              <SmallCount>0</SmallCount>
            </Area>
          </RowArea>
        </Area>
      </RowArea>
    </BG>
  );
}
