import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../home/home.tsx';
import Cart from '../Cart/Cart.tsx';

const Tab = createBottomTabNavigator();

export default function BottomNavigationBar() {
  return (
    <Tab.Navigator initialRouteName="Food" screenOptions={{headerShown: false}}>
      {/*<Tab.Screen name="Food" component={Home} />*/}
      {/*<Tab.Screen name="Cart" component={Cart} />*/}
    </Tab.Navigator>
  );
}
