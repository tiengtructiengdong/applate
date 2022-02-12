import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

import styled from 'styled-components';
import {Header} from '@components/Header';

import {useDispatch, useSelector} from 'react-redux';
import {
  addPartnerAction,
  deletePartnerAction,
  getPartnerAction,
  searchUserAction,
} from '@store/actionTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  currentParkingLotSelector,
  partnerSelector,
  searchUserSelector,
} from '@store/selectors/parkingLotSelector';
import {popUp} from '@constants/Utils';
import {authSelector} from '@store/selectors/authSelector';

const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: #ffb500;
`;
const FieldArea = styled.View`
  align-self: center;
  flex: 1;
  width: 100%;
  padding-top: 50px;
  margin-bottom: -50px;
  background-color: #121212;
`;
const Label = styled.Text`
  font-size: 16px;
  margin-horizontal: 40px;
  color: #ffb500;
`;
const Input = styled.TextInput`
  height: 45px;
  font-size: 18px;
  border-radius: 5px;
  background-color: #424242;
  color: white;
  padding: 10px;
  margin-vertical: 8px;
  margin-horizontal: 40px;
`;

const UserSelectBG = styled.View`
  background-color: #212121;
  height: 167px;
  margin-top: -8px;
  margin-horizontal: 40px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
const UserSelect = styled.ScrollView`
  padding: 10px 20px;
`;

const UserSelectItem = styled.TouchableOpacity`
  flex-direction: row;
  padding-vertical: 10px;
  justify-content: center;
  align-items: center;
`;
const UserSelectLeft = styled.View`
  flex: 1;
`;
const UserSelectNameLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.color || '#ffffff'};
`;
const UserSelectSubLabel = styled.Text`
  font-size: 12px;
  font-weight: 300;
  color: ${props => props.color || '#ffffff'};
`;

const TagArea = styled.ScrollView`
  margin-horizontal: 40px;
  margin-top: 5px;
`;

const RemoveButton = styled.TouchableOpacity``;

const Screen = ({}) => {
  const [keyword, setKeyword] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const search = name => {
    if (name != '') {
      dispatch(searchUserAction(name));
    }
  };

  const parkingLot = useSelector(currentParkingLotSelector);
  const searchUser = useSelector(searchUserSelector);
  const partners = useSelector(partnerSelector);
  const auth = useSelector(authSelector);

  useEffect(() => {
    dispatch(getPartnerAction(parkingLot.Id));
  }, [dispatch]);

  const selectUser = user => {
    setKeyword('');
    dispatch(addPartnerAction(parkingLot.Id, user.Id));
  };

  const removeUser = user => {
    dispatch(deletePartnerAction(parkingLot.Id, user.Id));
  };

  const securePhoneNumber = number => {
    const last3 = number.substring(number.length - 3);
    return '*'.repeat(number.length - 3) + last3;
  };

  return (
    <Container>
      <Header
        bgColor={'#ffb500'}
        title={`Your Partners`}
        goBack={() => navigation.goBack()}
      />
      <FieldArea>
        <Label numberOfLines={1} adjustsFontSizeToFit>
          Add a partner by name, ID or phone number
        </Label>
        {searchUser != [] && keyword != '' ? (
          <UserSelectBG>
            <UserSelect>
              {searchUser
                .filter(user => {
                  const ids = partners.map(item => item.Id);
                  return !ids.includes(user.Id) && !ids.includes(auth.id);
                })
                .map((user, i) => (
                  <UserSelectItem
                    onPress={() => selectUser(user)}
                    key={`user_${i}`}>
                    <UserSelectLeft>
                      <UserSelectNameLabel color="#ffb500">
                        {user.FullName}
                      </UserSelectNameLabel>
                      <UserSelectSubLabel>
                        Phone number: {securePhoneNumber(user.PhoneNumber)}
                      </UserSelectSubLabel>
                    </UserSelectLeft>
                  </UserSelectItem>
                ))}
            </UserSelect>
          </UserSelectBG>
        ) : (
          <TagArea>
            {partners.map((user, i) => (
              <UserSelectItem disabled={true} key={`user_${i}`}>
                <UserSelectLeft>
                  <UserSelectNameLabel>{user.FullName}</UserSelectNameLabel>
                  <UserSelectSubLabel>
                    Phone number: {securePhoneNumber(user.PhoneNumber)}
                  </UserSelectSubLabel>
                </UserSelectLeft>
                <RemoveButton onPress={() => removeUser(user)}>
                  <Icon name="close-outline" size={30} color="red" />
                </RemoveButton>
              </UserSelectItem>
            ))}
          </TagArea>
        )}
      </FieldArea>
    </Container>
  );
};

export default React.memo(Screen);
