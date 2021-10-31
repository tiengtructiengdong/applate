import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DefaultPreference from 'react-native-default-preference';
import AppTabbar from '@components/AppTabbar';

import List from '@components/List';
import Scan from '@components/Scan';
import Settings from '@components/Settings';

import Auth from '@components/Auth';
import Register from '@components/Auth/Register';
import {createStackNavigator} from '@react-navigation/stack';

function App() {
  const [token, setToken] = useState('');
  DefaultPreference.get('token').then(t => {
    if (t && (token == null || token == '')) {
      setToken(t);
    }
  });

  if (token == null || token == '') {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen
            name="Auth"
            component={Auth}
            props={{setToken: setToken}}
          />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
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
export default App;
