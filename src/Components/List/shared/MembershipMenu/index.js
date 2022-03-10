import {setMembershipAction} from '@store/actionTypes';
import {membershipListSelector} from '@store/selectors/parkingLotSelector';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

const BG = styled.View`
  background-color: #000000a0;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
`;
const Menu = styled.View`
  height: 300px;
  margin-horizontal: 50px;
  background-color: #636363;
  border-radius: 10px;
  overflow: hidden;
  border-width: 1px;
  border-color: #ffb500;
`;
const Headbar = styled.View`
  height: 45px;
  background-color: #ffb500;
  justify-content: center;
`;
const Headtext = styled.Text`
  font-size: 16px;
  text-align: center;
  color: #000;
  font-weight: 800;
`;
const Scroll = styled.ScrollView`
  padding-vertical: 15px;
`;
const Cell = styled.TouchableOpacity`
  height: 45px;
  margin: 5px 20px;
  background-color: #212121;
  border-radius: 5px;
  justify-content: center;
`;
const Celltext = styled.Text`
  font-size: 16px;
  font-weight: ${props => props.fontWeight || 600}
  color: ${props => props.color || 'white'};
  text-align: left;
  margin-horizontal: 20px;
`;
const BottomArea = styled.View`
  height: 45px;
  flex-direction: row;
`;
const Button = styled.TouchableOpacity`
  background-color: #424242;
  flex: 1;
  justify-content: center;
`;
const Buttontext = styled(Celltext)`
  font-weight: 400;
  text-align: center;
`;

export function MembershipMenu({
  parkingLotId,
  plateId,
  currentMembership,
  setVisible,
}) {
  const dispatch = useDispatch();
  const membershipList = useSelector(membershipListSelector);

  const select = mem => {
    console.log(mem);
    dispatch(setMembershipAction(parkingLotId, plateId, mem.Id));
    setVisible(false);
  };

  return (
    <BG>
      <Menu>
        <Headbar>
          <Headtext>Choose membership</Headtext>
        </Headbar>
        <Scroll>
          {membershipList
            .filter(x => x.Name != 'Default')
            .map((mem, i) => (
              <Cell
                key={`mem_${i}`}
                onPress={() => {
                  select(mem);
                }}>
                <Celltext
                  color={mem.Name == currentMembership ? '#ffb500' : 'white'}
                  fontWeight={mem.Name == currentMembership ? 600 : 400}>
                  {mem.Name}
                </Celltext>
              </Cell>
            ))}
        </Scroll>
        <BottomArea>
          <Button onPress={() => setVisible(false)}>
            <Buttontext color="#ffb500">Cancel</Buttontext>
          </Button>
        </BottomArea>
      </Menu>
    </BG>
  );
}
