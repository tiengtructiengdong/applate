import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Auth from '@components/Auth';
import Register from '@components/Auth/Register';
import {createStackNavigator} from '@react-navigation/stack';

function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
