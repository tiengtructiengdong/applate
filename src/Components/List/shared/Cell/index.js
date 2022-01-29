import React from 'react';
import styled from 'styled-components';

const BG = styled.TouchableOpacity`
  background-color: white;
  margin: 10px 0px 10px 0px;
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
`;
const Name = styled.Text`
  font-weight: 700;
  font-size: 18px;
  padding-right: 5px;
`;
const Price = styled.Text`
  font-weight: 800;
  font-size: 16px;
  color: #3e619b;
  text-align: right;
`;
const DateTime = styled.Text`
  font-weight: 500;
  font-size: 14px;
  color: #344a5f;
  text-align: right;
`;

function Cell({vehicle, onPress}) {
  return (
    <BG activeOpacity={0.5}>
      <Left>
        <Name>{vehicle.PlateId}</Name>
      </Left>
      <Right>
        <Price>123₫</Price>
        <DateTime>{vehicle.CheckinDateTime}</DateTime>
      </Right>
    </BG>
  );
}

export default Cell;
