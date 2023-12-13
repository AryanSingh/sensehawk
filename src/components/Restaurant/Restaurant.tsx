import * as React from 'react';
import {foodList} from '../../data.ts';
import {ScrollView, StyleSheet, View} from 'react-native';
import {IFoodItem} from '../../data.interface.ts';
import MenuItem from '../MenuItem/MenuItem.tsx';
import {Badge, IconButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store.tsx';
import {useEffect} from 'react';
import {clearCart} from '../Cart/cartSlice.tsx';
import {Searchbar} from 'react-native-paper';

const Styles = StyleSheet.create({
  mainContainerStyle: {
    flexDirection: 'column',
    flex: 1,
  },
  floatingMenuButtonStyle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 35,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 0,
  },
});

// @ts-ignore

// @ts-ignore
const Restaurant = ({route, navigation}) => {
  const {restaurant} = route.params;
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) =>
    Object.keys(state.cartItems).reduce(
      (acc, val) => (acc = acc + state.cartItems[val]),
      0,
    ),
  );
  const cartRestaurantId = useSelector(
    (state: RootState) => state.restaurantId,
  );
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);

  useEffect(() => {
    if (restaurant) {
      if (restaurant.id !== cartRestaurantId) {
        dispatch(clearCart());
      }
    }
  }, [restaurant, cartRestaurantId, dispatch]);
  const renderMenu = () => {
    let menuItems: IFoodItem[] = [];
    restaurant.foodList.forEach((food: number) => {
      if (foodList.get(food)) {
        menuItems.push(foodList.get(food) as IFoodItem);
      }
    });
    return menuItems.map(menuItem => {
      return (
        <MenuItem
          menuItem={menuItem}
          navigation={navigation}
          restaurant={restaurant}
        />
      );
    });
  };
  return (
    <View style={Styles.mainContainerStyle}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <ScrollView>{renderMenu()}</ScrollView>
      <View style={Styles.floatingMenuButtonStyle}>
        <IconButton
          icon="cart"
          size={30}
          mode="contained"
          onPress={() => navigation.navigate('Cart')}></IconButton>
        {count ? <Badge style={Styles.badge}>{count}</Badge> : null}
      </View>
    </View>
  );
};

export default Restaurant;
