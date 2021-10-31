import React, {useState, useNavigation} from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DefaultPreference from 'react-native-default-preference';
import ListVC from './Components/List';
import ScanVC from './Components/Scan';
import SettingsVC from './Components/Settings';
import {AppTabbar} from './Components/AppTabbar';
import {useIsFocused} from '@react-navigation/native';
import {loginService, registerService} from './Services';
import {post, get} from './Services/requests';
import styled from 'styled-components';

function List({navigation}) {
  return <ListVC navigation={navigation}></ListVC>;
}

function Scan({navigation}) {
  const isFocused = useIsFocused();

  if (isFocused) {
    return <ScanVC navigation={navigation}></ScanVC>;
  }
  return <View style={{flex: 1, backgroundColor: '#121212'}}></View>;
}

function Settings({navigation}) {
  return <SettingsVC navigation={navigation}></SettingsVC>;
}

const FieldArea = styled.View`
  align-self: center;
  justify-content: center;
  margin-horizontal: 30px;
  width: 250px;
  margin-top: 200px;
`;

const Label = styled.Text`
  font-size: 20px;
`;

const Input = styled.TextInput`
  height: 50px;
  font-size: 20px;
  border-radius: 5px;
  background-color: #eeeeee;
  padding: 10px;
  margin-vertical: 12px;
`;

const Button = styled.TouchableOpacity`
  background-color: #ffb500;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const ButtonArea = styled.View`
  height: 50px;
  flex-direction: row;
  margin-top: 10px;
`;
const ButtonSpace = styled.View`
  width: 10px;
`;

function App() {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation;

  const login = () => {
    post(
      {
        service: loginService,
        body: {
          number: username,
          password: password,
        },
      },
      json => {
        console.log(json, 'successful');
      },
      json => {
        console.log(json, 'fail');
      },
    );
  };

  DefaultPreference.get('token').then(t => {
    if (t && (token == null || token == '')) {
      setToken(t);
    }
  });

  if (token == null || token == '') {
    return (
      <NavigationContainer>
        <FieldArea>
          <Label>Username</Label>
          <Input onChangeText={text => setUsername(text)} />
          <Label>Password</Label>
          <Input onChangeText={text => setPassword(text)} secureTextEntry />

          <ButtonArea>
            <Button onPress={login}>
              <Label>Login</Label>
            </Button>
            <ButtonSpace />
            <Button>
              <Label>Register</Label>
            </Button>
          </ButtonArea>
        </FieldArea>
      </NavigationContainer>
    );
  }
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <AppTabbar {...props} />}>
        <Tab.Screen name="List" component={List} />
        <Tab.Screen name="Scan" component={Scan} options={{tabBarBadge: 3}} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

//org.reactjs.native.example.plateapp

export default App;
