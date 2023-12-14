import * as React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {foodList, restaurantList} from '../../data.ts';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ICheckoutItem} from '../../data.interface.ts';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store.tsx';
import restaurant from '../Restaurant/Restaurant.tsx';

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
  restaurantName: {
    margin: 10,
  },
  scrollContainer: {
    paddingBottom: 40,
    marginBottom: 60,
  },
  searchContainer: {
    margin: 10,
  },
  totalText: {
    margin: 10,
  },
  emptyCartView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
  },
});

// @ts-ignore
const LeftContent = props => <Avatar.Icon {...props} icon="food" />;

// @ts-ignore
const Cart = ({navigation}) => {
  const cartItems = useSelector((state: RootState) => state.cartItems);
  const restaurantId = useSelector((state: RootState) => state.restaurantId);
  const restaurant = restaurantId
    ? restaurantList.find(item => item.id === restaurantId)
    : null;
  const cartItemsKeys = Object.keys(cartItems);
  const [foodItems, setFoodItems] = useState<ICheckoutItem[]>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      let arr: ICheckoutItem[] = [];
      cartItemsKeys.forEach(itemKey => {
        let foodItem = foodList.get(parseInt(itemKey));
        if (foodItem) {
          arr.push({
            count: cartItems[parseInt(itemKey)],
            foodId: parseInt(itemKey),
            ...foodItem,
          });
        }
      });
      setFoodItems(arr);
      setTotalPrice(arr.reduce((acc, cur) => acc + cur.price * cur.count, 0));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [cartItems, cartItemsKeys, navigation]);

  const renderCart = () => {
    return foodItems
      ? foodItems.map(food => {
          return (
            <Card style={Styles.restaurantCard} key={food.id}>
              <Card.Title title={food.name} subtitle="" left={LeftContent} />
              <Card.Content>
                <Text variant="titleLarge">{food.name}</Text>
                <Text variant="bodyMedium">
                  Cost: {food.price} * {food.count} = {food.price * food.count}
                </Text>
                <Text variant="bodyMedium">Cuisine: {food.cuisine}</Text>
              </Card.Content>
              {/*<Card.Cover source={{uri: 'https://picsum.photos/700'}} />*/}
              {/*<Card.Actions>*/}
              {/*  <Button icon="remove">Remove</Button>*/}
              {/*  <Text variant="bodyMedium">{count}</Text>*/}
              {/*  <Button icon="add">Add</Button>*/}
              {/*</Card.Actions>*/}
            </Card>
          );
        })
      : [];
  };
  return (
    <View>
      {restaurant && totalPrice ? (
        <Text style={Styles.restaurantName} variant="headlineMedium">
          {restaurant.name}
        </Text>
      ) : null}
      <ScrollView>{renderCart()}</ScrollView>
      <View style={Styles.totalText}>
        {totalPrice === 0 ? (
          <View style={Styles.emptyCartView}>
            <Text>Cart empty</Text>
          </View>
        ) : (
          <Text variant="headlineMedium">Total: {totalPrice}</Text>
        )}
      </View>
    </View>
  );
};

export default Cart;
