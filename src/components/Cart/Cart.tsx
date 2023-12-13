import * as React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {foodList} from '../../data.ts';
import {View} from 'react-native';
import {ICartItem, ICheckoutItem, IFoodItem} from '../../data.interface.ts';
import {Icon, MD3Colors, Button} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store.tsx';

// @ts-ignore
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

// @ts-ignore
const Cart = ({route, navigation}) => {
  const dispatch = useDispatch();
  const cartItemsKeys = useSelector((state: RootState) =>
    Object.keys(state.cartItems),
  );
  const [foodItems, setFoodItems] = useState<ICheckoutItem[]>();
  const {restaurant} = route.params;

  useEffect(() => {
    let arr = [];
    cartItemsKeys.forEach(itemKey => {});
  }, [cartItemsKeys]);
  const renderMenu = () => {
    let menuItems: IFoodItem[] = [];
    restaurant.foodList.forEach((food: number) => {
      if (foodList.get(food)) {
        menuItems.push(foodList.get(food) as IFoodItem);
      }
    });
    return menuItems.map(menuItem => {
      return (
        <Card
          onPress={() => navigation.navigate('Restaurant')}
          key={menuItem.id}>
          <Card.Title
            title={menuItem.name}
            subtitle="Card Subtitle"
            left={LeftContent}
          />
          <Card.Content>
            <Text variant="titleLarge">{menuItem.name}</Text>
            <Text variant="bodyMedium">Price: {menuItem.price}</Text>
            <Text variant="bodyMedium">Cuisine: {menuItem.cuisine}</Text>
          </Card.Content>
          {/*<Card.Cover source={{uri: 'https://picsum.photos/700'}} />*/}
          <Card.Actions>
            <Button icon="remove">Remove</Button>
            <Text variant="bodyMedium">{count}</Text>
            <Button icon="add">Add</Button>
          </Card.Actions>
        </Card>
      );
    });
  };
  return <View>{renderMenu()}</View>;
};

export default Cart;
