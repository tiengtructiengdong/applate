import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import store from './store';
import {Provider} from 'react-redux';
import RootStack from '@components/RootStack';
////////////////////////////

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}
export default App;
