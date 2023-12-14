/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {useCallback, useEffect, useState} from 'react';
// @ts-ignore
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Home from './src/components/home/home.tsx';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Cart from './src/components/Cart/Cart.tsx';
import LoginScreen from './src/components/Login/LoginScreen.js';
import RegisterScreen from './src/components/Login/RegistrationScreen.js';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Badge, BottomNavigation, IconButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from './src/store.tsx';
import {StyleSheet, View} from 'react-native';

// import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -12,
    right: -12,
  },
});

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

function App(): React.JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const count = useSelector((state: RootState) =>
    Object.keys(state.cartItems).reduce(
      (acc, val) => (acc = acc + state.cartItems[val]),
      0,
    ),
  );

  const onAuthStateChanged = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      setUser(user);
      if (loading) {
        setLoading(false);
      }
    },
    [loading],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Auth"
        screenOptions={{headerShown: false}}
        tabBar={({navigation, state, descriptors, insets}) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({route, preventDefault}) => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.navigate(route.name);
              }
            }}
            renderIcon={({route, focused, color}) => {
              const {options} = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({focused, color, size: 24});
              }

              return null;
            }}
            getLabelText={({route}) => {
              const {options} = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title;

              return label;
            }}
          />
        )}>
        <Tab.Screen
          name="Auth"
          component={Auth}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color, size}) => {
              return <Icon name="face-man" size={size} color={color} />;
            },
          }}
        />
        {user && (
          <Tab.Screen
            name="Restaurants"
            component={Home}
            options={{
              tabBarLabel: 'Food',
              tabBarIcon: ({color, size}) => {
                return (
                  <Icon name="food-fork-drink" size={size} color={color} />
                );
              },
            }}
          />
        )}

        {/*<Tab.Screen name="Menu" component={Restaurant} />*/}
        {user && (
          <Tab.Screen
            name="Cart"
            component={Cart}
            options={{
              tabBarLabel: 'Cart',
              headerShown: true,
              tabBarBadge: count,
              tabBarIcon: ({color, size}) => {
                // return <Icon name="cart" size={size} color={color} />;
                return (
                  <View>
                    <Icon color={color} name="cart" size={size} />
                    {count ? <Badge style={Styles.badge}>{count}</Badge> : null}
                  </View>
                );
              },
            }}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
