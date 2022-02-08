import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

import styled from 'styled-components';
import {Header} from '@components/Header';

import {useDispatch, useSelector} from 'react-redux';
import {addPartnerAction, searchUserAction} from '@store/actionTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  currentParkingLotSelector,
  searchUserSelector,
} from '@store/selectors/parkingLotSelector';
import {popUp} from '@constants/Utils';

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
  color: white;
`;
const BlackLabel = styled(Label)`
  color: black;
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
const Button = styled.TouchableOpacity`
  background-color: #ffb500;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-horizontal: 40px;
  height: 50px;
`;
const ButtonArea = styled.View`
  height: 90px;
  background-color: #121212;
  flex-direction: row;
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
  padding-vertical: 6px;
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

const Screen = ({forced}) => {
  const [keyword, setKeyword] = useState('');
  const [selectedId, setId] = useState(new Array(0));
  const [selectedName, setName] = useState(new Array(0));

  const [boo, trigger] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const search = name => {
    if (name != '') {
      dispatch(searchUserAction(name));
    }
  };

  const parkingLot = useSelector(currentParkingLotSelector);
  const searchUser = useSelector(searchUserSelector);

  const addPartner = () => {
    selectedId.forEach(partnerId => {
      dispatch(addPartnerAction(parkingLot.Id, partnerId));
    });
    navigation.goBack();
  };

  const selectUser = user => {
    setKeyword('');
    const ids = selectedId;
    ids.push(user.Id);
    setId(ids);

    const names = selectedName;
    names.push(user.FullName);
    setName(names);
  };

  const removeUser = i => {
    trigger(!boo);
    const ids = selectedId;
    ids.splice(i, 1);
    setId(ids);

    const names = selectedName;
    names.splice(i, 1);
    setName(names);
  };

  const securePhoneNumber = number => {
    const last3 = number.substring(number.length - 3);
    return '*'.repeat(number.length - 3) + last3;
  };

  return (
    <Container>
      <Header
        bgColor={'#ffb500'}
        title={`Add Partnership`}
        goBack={() => navigation.goBack()}
      />
      <FieldArea>
        <Label>Partner's name or ID</Label>
        <Input
          value={keyword}
          onChangeText={text => {
            setKeyword(text);
            search(text);
          }}
        />
        {searchUser.length > 0 && keyword != '' ? (
          <UserSelectBG>
            <UserSelect>
              {searchUser
                .filter(user => !selectedId.includes(user.Id))
                .map(user => (
                  <UserSelectItem onPress={() => selectUser(user)}>
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
            {selectedId.map((_, i) => (
              <UserSelectItem disabled={true}>
                <UserSelectLeft>
                  <UserSelectNameLabel>{selectedName[i]}</UserSelectNameLabel>
                </UserSelectLeft>
                <RemoveButton onPress={() => removeUser(i)}>
                  <Icon name="close-outline" size={30} color="red" />
                </RemoveButton>
              </UserSelectItem>
            ))}
          </TagArea>
        )}
      </FieldArea>
      <ButtonArea>
        <Button onPress={addPartner} disabled={selectedId.length === 0}>
          <BlackLabel>Add partner</BlackLabel>
        </Button>
      </ButtonArea>
    </Container>
  );
};

export default React.memo(Screen);
