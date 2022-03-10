import React, {memo, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import styled from 'styled-components';
import {Alert} from 'react-native';

import AddParkingLot from './AddParkingLot';
import Cell from './shared/Cell';
import {useDispatch, useSelector} from 'react-redux';
import {
  sessionSelector,
  currentParkingLotSelector,
  myParkingLotSelector,
  workingParkingLotSelector,
  membershipListSelector,
} from '@store/selectors/parkingLotSelector';
import {useNavigation} from '@react-navigation/native';
import {
  getActiveSessionAction,
  getAllParkingLotsAction,
  getParkAction,
  searchVehicleAction,
  setMembershipAction,
} from '@store/actionTypes';

import {Overview} from './shared/Overview';
import AddMembership from './AddMembership';
import AddPartner from './AddPartner';
import ViewPrice from './ViewPrice';
import SettingsBluetooth from '@components/Settings/SettingsBluetooth';
import {MembershipMenu} from './shared/MembershipMenu';

const Stack = createStackNavigator();

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #121212;
`;
const Container = styled.View`
  flex: 1;
  background-color: #121212;
`;
const SearchBar = styled.TextInput`
  height: 40px;
  border-bottom-width: 1px;
  font-size: 14px;
  margin-top: 5px;
  background-color: #1a1a1a;
  padding-horizontal: 25px;
  color: white;
`;
const LabelArea = styled.View`
  margin-horizontal: 25px;
  height: 78px;
  padding-top: 15px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  overflow: hidden;
  background-color: #ffc500;
`;
const Label = styled.Text`
  font-weight: 600;
  font-size: 17px;
  color: ${props => props.color || 'white'};
  padding-left: 25px;
`;
const SessionArea = styled.ScrollView`
  background-color: ${props => props.color || '#1a1a1a'};
  flex: 1;
  margin: 1px 25px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding-horizontal: 20px;
  padding-vertical: 10px;
  margin-bottom: 30px;
`;

const List = ({}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const myParkingLots = useSelector(myParkingLotSelector);
  const workingParkingLots = useSelector(workingParkingLotSelector);

  const parkingLot = useSelector(currentParkingLotSelector);
  const session = useSelector(sessionSelector);

  const memberships = useSelector(membershipListSelector);

  // set membership customerId, currentMembership, setVisible
  const [currentPlateId, setCurrentPlateId] = useState('');
  const [currentMembership, setCurrentMembership] = useState('');
  const [isMembershipUpgradeVisible, setMembershipUpgradeVisible] =
    useState(false);

  const [searchVehicle, setSearchVehicle] = useState('');

  useEffect(() => {
    dispatch(getAllParkingLotsAction());
  }, [dispatch]);

  useEffect(() => {
    if (parkingLot?.Id) {
      if (searchVehicle === '') {
        dispatch(getActiveSessionAction(parkingLot.Id));
      } else {
        dispatch(searchVehicleAction(parkingLot.Id, searchVehicle));
      }
    }
  }, [parkingLot, searchVehicle]);

  useEffect(() => {
    if (parkingLot === undefined || parkingLot === {}) {
      navigation.navigate('AddParkingLot', {forced: true});
    }
  }, [parkingLot]);

  const confirmSelect = parkId => {
    dispatch(getParkAction(parkId));
  };

  // menu commands
  const viewMembershipPrice = () => {
    navigation.navigate('ViewPrice');
  };
  const addPartner = () => {
    navigation.navigate('AddPartner');
  };
  const addParkingLot = () => {
    navigation.navigate('AddParkingLot');
  };
  const testBluetoothPrinter = () => {
    navigation.navigate('Bluetooth');
  };

  // vehicle options
  const showVehicleOptions = vehicle => {
    const {PlateId} = vehicle;
    const Membership = vehicle.Name;

    console.log(vehicle);
    Alert.alert(
      PlateId,
      Membership && Membership != 'Default'
        ? `Member level: ${Membership}`
        : '',
      [
        {
          text: 'Upgrade membership',
          onPress: () => {
            upgradeMembership(PlateId, Membership);
          },
        },
        {
          text: 'Cancel membership',
          style: 'destructive',
          onPress: () => {
            removeMembership(PlateId);
          },
        },
        {
          text: 'Lost ticket?',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };
  const upgradeMembership = (plateId, membership) => {
    console.log(membership);
    setCurrentPlateId(plateId);
    setCurrentMembership(membership);
    setMembershipUpgradeVisible(true);
  };
  const removeMembership = plateId => {
    const passerById = memberships[0]?.Id;
    if (passerById)
      dispatch(setMembershipAction(parkingLot.Id, plateId, passerById));
  };

  return (
    <>
      <SafeArea>
        <Container>
          {parkingLot !== undefined && parkingLot !== {} ? (
            <Overview
              parkingLot={parkingLot}
              confirmSelect={confirmSelect}
              myParkingLots={myParkingLots}
              workingParkingLots={workingParkingLots}
              viewMembershipPrice={viewMembershipPrice}
              addParkingLot={addParkingLot}
              addPartner={addPartner}
              testBluetoothPrinter={testBluetoothPrinter}
            />
          ) : (
            <></>
          )}
          <LabelArea>
            <Label color="black">Current sessions</Label>
            <SearchBar
              placeholderTextColor="#777777"
              placeholder="Search vehicle..."
              value={searchVehicle}
              onChangeText={setSearchVehicle}
            />
          </LabelArea>
          <SessionArea>
            {session.map((customer, id) => (
              <Cell
                key={id}
                vehicle={customer}
                onPress={() => {
                  showVehicleOptions(customer);
                }}
              />
            ))}
          </SessionArea>
        </Container>
      </SafeArea>
      {isMembershipUpgradeVisible ? (
        <MembershipMenu
          parkingLotId={parkingLot.Id}
          plateId={currentPlateId}
          currentMembership={currentMembership}
          setVisible={setMembershipUpgradeVisible}
        />
      ) : (
        <></>
      )}
    </>
  );
};

const ListStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="AddParkingLot" component={AddParkingLot} />
      <Stack.Screen name="AddMembership" component={AddMembership} />
      <Stack.Screen name="AddPartner" component={AddPartner} />
      <Stack.Screen name="ViewPrice" component={ViewPrice} />
      <Stack.Screen name="Bluetooth" component={SettingsBluetooth} />
    </Stack.Navigator>
  );
};

export default memo(ListStack);
