import * as React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {foodList} from '../../data.ts';
import {View} from 'react-native';
import {IFoodItem} from '../../data.interface.ts';
import {Icon, MD3Colors, Button} from 'react-native-paper';
import {useState} from 'react';

// @ts-ignore
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

// @ts-ignore
const Cart = ({route, navigation}) => {
  const [count, setCount] = useState<number>(2);
  const {restaurant} = route.params;
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
