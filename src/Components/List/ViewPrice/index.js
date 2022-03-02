import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import styled from 'styled-components';
import {Header} from '@components/Header';

import {useDispatch, useSelector} from 'react-redux';
import {
  currentParkingLotSelector,
  membershipListSelector,
} from '@store/selectors/parkingLotSelector';
import {
  addMembershipAction,
  deleteMembershipAction,
  updateMembershipAction,
} from '@store/actionTypes';

const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: #ffb500;
`;
const FieldArea = styled.View`
  align-self: center;
  width: 100%;
  padding-top: 20px;
  background-color: #121212;
`;
const Row = styled.View`
  margin-horizontal: 40px;
  flex-direction: row;
  align-items: center;
`;
const SelectorArea = styled.View`
  align-self: center;
  flex: 1;
  width: 100%;
  padding-horizontal: 20px;
  padding-top: 7px;
  padding-bottom: 25px;
  background-color: #121212;
`;
const Label = styled.Text`
  font-size: 18px;
  color: white;
  width: 120px;
`;
const Input = styled.TouchableOpacity`
  height: 45px;
  flex: 1;
  font-size: 18px;
  border-radius: 5px;
  background-color: #424242;
  color: white;
  margin-vertical: 8px;
  margin-left: 20px;
  padding-left: 15px;
  padding-top: 10px;
`;
const NameInput = styled.TouchableOpacity`
  height: 45px;
  background-color: transparent;
  margin-left: 0px;
  padding-top: 10px;
  width: 120px;
  border-bottom-width: 1px;
  border-color: #424242;
`;
const NameText = styled.Text`
  color: #ffb500;
  font-size: 18px;
`;
const RemoveButton = styled.TouchableOpacity`
  margin-left: 10px;
`;

const Screen = ({}) => {
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const membershipList = useSelector(membershipListSelector);
  const parkingLot = useSelector(currentParkingLotSelector);
  const [field, setField] = useState();

  const addMembership = (name, price, level) => {
    dispatch(
      addMembershipAction(parkingLot.Id, {
        name,
        fee: {price},
        level,
      }),
    );
  };
  const removeMembership = membershipId => {
    dispatch(deleteMembershipAction(parkingLot.Id, membershipId));
  };

  // no ANDROID yet -- WARNING
  const editPrice = memId => {
    Alert.prompt('Parking price (VND)', '', price => {
      dispatch(updateMembershipAction(parkingLot.Id, memId, {fee: {price}}));
    });
  };

  const editName = memId => {
    Alert.prompt('Enter the name', '', name => {
      dispatch(updateMembershipAction(parkingLot.Id, memId, {name}));
    });
  };

  return (
    <Container>
      <Header
        bgColor={'#ffb500'}
        title={`Pricing (VND)`}
        goBack={() => navigation.goBack()}
        goRight={() => addMembership('Diamond', 0, 1)}
        iconRight="add-outline"
      />
      <FieldArea>
        <Row>
          <Label>Default</Label>
          <Input onPress={() => editPrice(membershipList[0].Id)}>
            <Label>{JSON.parse(membershipList[0].Fee).price}</Label>
          </Input>
        </Row>
        {membershipList
          .filter(item => item.Name != 'Passer-by')
          .map((membership, i) => (
            <Row key={`mem_${i}`}>
              <NameInput onPress={() => editName(membership.Id)}>
                <NameText>{membership.Name || ''}</NameText>
              </NameInput>
              <Input onPress={() => editPrice(membership.Id)}>
                <Label>{JSON.parse(membership.Fee).price}</Label>
              </Input>
              <RemoveButton onPress={() => removeMembership(membership.Id)}>
                <Icon name="close-outline" size={36} color="red" />
              </RemoveButton>
            </Row>
          ))}
      </FieldArea>
      <SelectorArea></SelectorArea>
    </Container>
  );
};

export default React.memo(Screen);
