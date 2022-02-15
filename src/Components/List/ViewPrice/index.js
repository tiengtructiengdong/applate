import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import styled from 'styled-components';
import {Header} from '@components/Header';

import {useDispatch, useSelector} from 'react-redux';
import {
  currentParkingLotSelector,
  membershipListSelector,
} from '@store/selectors/parkingLotSelector';
import {addMembershipAction} from '@store/actionTypes';

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
  align-self: center;
  color: white;
  width: 120px;
`;
const Input = styled.TextInput`
  height: 45px;
  flex: 1;
  font-size: 18px;
  border-radius: 5px;
  background-color: #424242;
  color: white;
  padding: 10px;
  margin-vertical: 8px;
  margin-left: 20px;
`;
const NameInput = styled.TextInput`
  height: 45px;
  font-size: 18px;
  background-color: transparent;
  color: #ffb500;
  margin-left: 0px;
  padding: 0px;
  width: 120px;
  border-bottom-width: 1px;
  border-color: #424242;
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

  return (
    <Container>
      <Header
        bgColor={'#ffb500'}
        title={`Pricing`}
        goBack={() => navigation.goBack()}
        goRight={() => addMembership('Diamond', 0, 1)}
        iconRight="add-outline"
      />
      <FieldArea>
        <Row>
          <Label>Default</Label>
          <Input
            value={membershipList[0].Fee.price || '0'}
            onChangeText={text => setName(text)}
          />
        </Row>
        {membershipList
          // .filter(item => item.Name != 'Passer-by')
          .map((membership, i) => (
            <Row key={`mem_${i}`}>
              <NameInput value={membership.Name || ''} />
              <Input onChangeText={text => setName(text)} />
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
