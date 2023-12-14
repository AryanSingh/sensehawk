import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RestaurantList from '../Restaurant/RestaurantList.tsx';
import Restaurant from '../Restaurant/Restaurant.tsx';

const Stack = createNativeStackNavigator();
const Home = () => {
  return (
    <Stack.Navigator initialRouteName="Restaurants">
      <Stack.Screen name="Restaurants" component={RestaurantList} />
      <Stack.Screen name="Menu" component={Restaurant} />
    </Stack.Navigator>
  );
};

export default Home;
