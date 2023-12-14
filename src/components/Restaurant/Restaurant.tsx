import * as React from 'react';
import {foodList} from '../../data.ts';
import {ScrollView, StyleSheet, View} from 'react-native';
import {IFoodItem} from '../../data.interface.ts';
import MenuItem from '../MenuItem/MenuItem.tsx';
import {Badge, IconButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store.tsx';
import {useCallback, useEffect, useState} from 'react';
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
  restaurantCard: {
    margin: 10,
  },
  scrollContainer: {
    paddingBottom: 40,
    marginBottom: 60,
  },
  searchContainer: {
    margin: 10,
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

  const [filteredMenu, setFilteredMenu] = useState<IFoodItem[]>([]);

  const filterMenu = useCallback(
    (query: string) => {
      let menuItems: IFoodItem[] = [];
      restaurant.foodList.forEach((food: number) => {
        if (foodList.get(food)) {
          menuItems.push(foodList.get(food) as IFoodItem);
        }
      });
      return menuItems.filter(item => {
        if (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.cuisine.toLowerCase().includes(query.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
    },
    [restaurant.foodList],
  );

  useEffect(() => {
    setFilteredMenu(filterMenu(searchQuery));
  }, [searchQuery, filterMenu]);
  const renderMenu = () => {
    return filteredMenu.map(menuItem => {
      return (
        <MenuItem
          menuItem={menuItem}
          navigation={navigation}
          restaurant={restaurant}
          style={Styles.restaurantCard}
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
        style={Styles.searchContainer}
      />
      <ScrollView style={Styles.scrollContainer}>{renderMenu()}</ScrollView>
      {/*<View style={Styles.floatingMenuButtonStyle}>*/}
      {/*  <IconButton*/}
      {/*    icon="cart"*/}
      {/*    size={30}*/}
      {/*    mode="contained"*/}
      {/*    onPress={() => navigation.navigate('Cart')}></IconButton>*/}
      {/*  {count ? <Badge style={Styles.badge}>{count}</Badge> : null}*/}
      {/*</View>*/}
    </View>
  );
};

export default Restaurant;
