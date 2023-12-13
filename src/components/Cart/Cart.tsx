import * as React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {foodList} from '../../data.ts';
import {View} from 'react-native';
import {ICheckoutItem} from '../../data.interface.ts';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store.tsx';

// @ts-ignore
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

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
            <Card key={food.id}>
              <Card.Title
                title={food.name}
                subtitle="Card Subtitle"
                left={LeftContent}
              />
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
      <View>
        <Text>Total: {totalPrice}</Text>
      </View>
    </View>
  );
};

export default Cart;
