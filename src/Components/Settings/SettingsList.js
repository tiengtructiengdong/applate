import {authSelector} from '@store/selectors/authSelector';
import React from 'react';
import styled from 'styled-components';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {Header} from '../Header';
import {logoutAction} from '@store/actionTypes';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#ffb500',
  },
  cell: {
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderBottomColor: '#606060',
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 15,
    overflow: 'hidden',
  },
  cellText: {
    fontSize: 17,
    marginLeft: 12,
    color: 'white',
  },
  scrollView: {
    height: '100%',
    backgroundColor: '#121212',
  },
  about: {
    padding: 25,
  },
  bold: {
    fontSize: 14,
    fontWeight: '400',
    paddingBottom: 3,
    color: '#909090',
  },
  regular: {
    fontSize: 12,
    fontWeight: '400',
    paddingBottom: 4,
    color: '#aeaeae',
  },
  languageSwitch: {
    fontWeight: '400',
    fontSize: 12,
    marginLeft: 120,
    marginRight: 0,
    textAlign: 'right',
  },
});

const Username = styled.Text`
  font-size: 17px;
  margin-left: 12px;
  font-weight: 700;
  padding-vertical: 2px;
  color: white;
`;
const OtherInfo = styled(Username)`
  font-size: 15px;
  font-weight: 400;
  color: white;
`;

const List = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  return (
    <SafeAreaView style={style.container}>
      <Header bgColor="#ffb500" title="Settings"></Header>
      <ScrollView style={style.scrollView} scrollEnabled={false}>
        <TouchableOpacity
          style={style.cell}
          //onPress={() => navigation.navigate('Information')}
        >
          <Username>{auth.fullName || ''}</Username>
          <OtherInfo>{auth.phoneNumber || ''}</OtherInfo>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={style.cell}
          onPress={() => navigation.navigate('Bluetooth')}>
          <Text style={style.cellText}>Bluetooth</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={style.cell}
          onPress={() => {
            dispatch(logoutAction());
          }}>
          <Text style={[style.cellText, {color: '#ff0000'}]}>Logout</Text>
        </TouchableOpacity>

        <View style={style.about}>
          <Text style={style.regular}>
            This project is for educational purposes only.
          </Text>
          <Text style={style.bold}>applate v0.16</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default List;
