import React, {useState} from 'react';
import styled from 'styled-components';
import Svg, {LinearGradient} from 'react-native-svg';
import {PieChart} from 'react-native-chart-kit';

import Icon from 'react-native-vector-icons/Ionicons';

const BG = styled.View`
  background-color: #424242;
  height: 220px;
  margin: 20px 25px 30px;
  border-radius: 15px;
  padding-horizontal: 20px;
  padding-top: 20px;
`;
const Select = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  margin: 0px 38px 20px 0px;
  align-items: center;
`;
const Name = styled.Text`
  font-weight: 600;
  font-size: 18px;
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
  background-color: #424242;
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

const ParkingLotSelectBG = styled.View`
  background-color: #212121;
  height: 167px;
  margin-top: -8px;
  margin-horizontal: -20px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
const ParkingLotSelect = styled.ScrollView`
  padding: 10px 20px;
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
const CommandButton = styled.TouchableOpacity`
  padding-left: 7px;
  margin-top: -20px;
`;
const CommandArea = styled.View`
  flex-direction: row;
  align-items: center;
`;

export function Overview({
  parkingLot,
  confirmSelect,
  myParkingLots,
  workingParkingLots,
  viewMembershipPrice,
  addParkingLot,
  addPartner,
}) {
  const today = new Date().getDate();
  const [select, toggleSelect] = useState(false);
  const data = [
    {
      population: 400,
      color: '#fbd837',
    },
    {
      population: 20,
      color: '#00000030',
    },
  ];

  const renderSelectItem = item => (
    <ParkingLotSelectItem onPress={() => confirmSelect(item.Id)}>
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
        {item.SpaceCount}{' '}
        <ParkingLotSelectSubLabel>left</ParkingLotSelectSubLabel>{' '}
      </ParkingLotSelectSpace>
    </ParkingLotSelectItem>
  );

  return (
    <BG>
      <CommandArea>
        <Select onPress={() => toggleSelect(!select)}>
          <Name adjustsFontSizeToFit numberOfLines={1}>
            {parkingLot.Name}
          </Name>
          <Icon name="chevron-down" size={16} color="white" />
        </Select>
        <CommandButton onPress={viewMembershipPrice}>
          <Icon name="cash-outline" size={20} color="white" />
        </CommandButton>
        <CommandButton onPress={addPartner}>
          <Icon name="person-add-outline" size={18} color="white" />
        </CommandButton>
        <CommandButton onPress={addParkingLot}>
          <Icon name="add-outline" size={22} color="white" />
        </CommandButton>
      </CommandArea>

      {select ? (
        <ParkingLotSelectBG>
          <ParkingLotSelect>
            <ParkingLotSelectLabel>MY PARKS</ParkingLotSelectLabel>
            {myParkingLots.map(renderSelectItem)}
            <ParkingLotSelectLabel>WORKING PARKS</ParkingLotSelectLabel>
            {workingParkingLots.map(renderSelectItem)}
          </ParkingLotSelect>
        </ParkingLotSelectBG>
      ) : (
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
              <VehicleCount color="#fbd837">
                {parkingLot.SpaceCount}
              </VehicleCount>
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
      )}
    </BG>
  );
}
