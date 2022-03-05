import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppTabbar from '@components/AppTabbar';

import List from '@components/List';
import Scan from '@components/Scan';
import Settings from '@components/Settings';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const MainStack = ({}) => {
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const tabNavigation = useNavigation();
  //   if (tabNavigation) {
  //     tabNavigation.navigate('List');
  //   }
  // }, [dispatch]);

  return (
    <Tab.Navigator tabBar={props => <AppTabbar {...props} />}>
      <Tab.Screen name="List" component={List} />
      <Tab.Screen name="Scan" component={Scan} options={{tabBarBadge: 3}} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default React.memo(MainStack);
