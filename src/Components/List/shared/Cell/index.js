import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

const BG = styled.TouchableOpacity`
  background-color: #424242;
  margin: 5px 0px 10px 0px;
  border-radius: 10px;
  padding: 15px;
  flex-direction: row;
`;
const Left = styled.View`
  flex: 3;
  align-self: center;
`;
const Right = styled.View`
  flex: 2;
  align-self: center;
`;
const Name = styled.Text`
  font-weight: 600;
  font-size: 18px;
  padding-right: 5px;
  color: white;
`;
const DateTimeText = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: #fbd837;
  text-align: right;
`;
const MembershipText = styled.Text`
  font-weight: 500;
  font-size: 14px;
  color: #fbd837;
  text-align: left;
`;

function Cell({vehicle, onPress}) {
  if (!vehicle) {
    return <></>;
  }
  const date = vehicle.CheckinDateTime
    ? new Date(vehicle.CheckinDateTime)
    : new Date();
  const membership = vehicle.Name || '';
  //const price = vehicle.Fee ? JSON.parse(vehicle.Fee).price || 0 : 0;

  return (
    <BG activeOpacity={0.5} onPress={onPress}>
      <Left>
        <Name>{vehicle.PlateId || ''}</Name>
        {membership != 'Default' ? (
          <MembershipText>{membership}</MembershipText>
        ) : (
          <></>
        )}
      </Left>
      <Right>
        <DateTimeText>{moment(date).format('hh:mm')}</DateTimeText>
      </Right>
    </BG>
  );
}

export default Cell;
