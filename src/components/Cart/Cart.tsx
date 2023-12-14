import * as React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {foodList} from '../../data.ts';
import {StyleSheet, View} from 'react-native';
import {ICheckoutItem} from '../../data.interface.ts';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store.tsx';

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
  totalText: {
    margin: 10,
  },
});

// @ts-ignore
const LeftContent = props => <Avatar.Icon {...props} icon="food" />;

// @ts-ignore
const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cartItems);
  const cartItemsKeys = Object.keys(cartItems);
  const [foodItems, setFoodItems] = useState<ICheckoutItem[]>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
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
  }, []);
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
      {renderCart()}
      <View style={Styles.totalText}>
        <Text variant="headlineMedium">Total: {totalPrice}</Text>
      </View>
    </View>
  );
};

export default Cart;
