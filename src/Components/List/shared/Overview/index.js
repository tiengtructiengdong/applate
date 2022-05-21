import React, {useState} from 'react';
import styled from 'styled-components';
import Svg, {LinearGradient} from 'react-native-svg';
import {PieChart} from 'react-native-chart-kit';

import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  displayCountSelector,
  isMyParkSelector,
  spaceCountSelector,
} from '@store/selectors/parkingLotSelector';
import {
  bluetoothPrinterSelector,
  isBluetoothPrinterConnectedSelector,
} from '@store/selectors/settingsSelector';
import {getAllParkingLotsAction} from '@store/actionTypes';

const BG = styled.View`
  background-color: #424242;
  margin: -5px 25px 25px 25px;
  border-radius: 15px;
  padding: 20px;
`;
const Select = styled.TouchableOpacity`
  flex-direction: row;
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
  padding-top: ${props => props.paddingTop || 0}px;
`;
const Area = styled.View`
  align-items: center;
  flex: 1;
`;
const ChartArea = styled.View`
  width: 125px;
  height: 115px;
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
  height: 143px;
  margin-top: -8px;
  margin-bottom: -20px;
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
  align-items: center;
  flex: 1;
  border-radius: 6px;
  background-color: #303030;
  margin-horizontal: 3px;
  padding-vertical: 10px;
`;
const CommandArea = styled.View`
  flex-direction: row;
  align-items: center;
  height: 90px;
  padding-top: 20px;
`;
const CommandText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  letter-spacing: -0.5px;
  padding-top: 5px;
  color: ${props => props.color || 'white'};
`;

export function Overview({
  parkingLot,
  confirmSelect,
  myParkingLots,
  workingParkingLots,
  viewMembershipPrice,
  addParkingLot,
  addPartner,
  testBluetoothPrinter,
}) {
  const dispatch = useDispatch();
  const today = new Date().getDate();
  const isMyPark = useSelector(isMyParkSelector);
  const displayCount = useSelector(displayCountSelector);
  const spaceCount = useSelector(spaceCountSelector);
  const [select, toggleSelect] = useState(false);
  const data =
    spaceCount > 0
      ? [
          {
            population: displayCount,
            color: '#fbd837',
          },
          {
            population: spaceCount - displayCount,
            color: '#00000030',
          },
        ]
      : [
          {
            population: 1,
            color: '#00000030',
          },
        ];

  const selectItem = id => {
    confirmSelect(id);
    toggleSelect(false);
  };

  const renderSelectItem = (item, i) => (
    <ParkingLotSelectItem onPress={() => selectItem(item.Id)} key={`item_${i}`}>
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
        {Math.abs(item.SpaceCount - item.Count)}{' '}
        <ParkingLotSelectSubLabel>
          {item.SpaceCount != 0 ? 'left' : 'vehicles'}
        </ParkingLotSelectSubLabel>{' '}
      </ParkingLotSelectSpace>
    </ParkingLotSelectItem>
  );

  return (
    <BG>
      <Select
        onPress={() => {
          toggleSelect(!select);
          dispatch(getAllParkingLotsAction());
        }}>
        <Name numberOfLines={3}>{parkingLot.Name}</Name>
        <Icon name="chevron-down" size={16} color="white" />
      </Select>

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
              <VehicleCount color="#fbd837">{displayCount}</VehicleCount>
              <Label>
                {parkingLot.SpaceCount != 0 ? 'Space left' : 'Motorbikes'}
              </Label>
            </ChartOverlay>
          </ChartArea>
          <Area>
            <CommandArea>
              <CommandButton onPress={viewMembershipPrice}>
                <Icon name="cash-outline" size={26} color="#fbd837" />
                <CommandText>Park{'\n'}price</CommandText>
              </CommandButton>
              {isMyPark ? (
                <CommandButton onPress={addPartner}>
                  <Icon name="person-add-outline" size={26} color="#fbd837" />
                  <CommandText>Add partner</CommandText>
                </CommandButton>
              ) : (
                <></>
              )}
              <CommandButton onPress={addParkingLot}>
                <Icon name="add-outline" size={26} color="#fbd837" />
                <CommandText>New{'\n'}park</CommandText>
              </CommandButton>
            </CommandArea>
          </Area>
        </RowArea>
      )}
    </BG>
  );
}
