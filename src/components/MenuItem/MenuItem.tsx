import {Avatar, Card, IconButton, MD3Colors, Text} from 'react-native-paper';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store.tsx';
import {changeItem} from '../Cart/cartSlice.tsx';

// @ts-ignore
const LeftContent = props => <Avatar.Icon {...props} icon="food" />;

// @ts-ignore
const MenuItem = props => {
  const {menuItem, navigation, restaurant} = props;
  const count = useSelector((state: RootState) =>
    state.cartItems[menuItem.id] ? state.cartItems[menuItem.id] : 0,
  );
  const dispatch = useDispatch();

  return (
    <Card
      // onPress={() => navigation.navigate('Restaurant')}
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
        <IconButton
          onPress={() =>
            dispatch(
              changeItem({
                restaurantId: restaurant.id,
                change: -1,
                itemId: menuItem.id,
              }),
            )
          }
          iconColor={MD3Colors.error50}
          size={20}
          icon="minus"
        />
        <Text variant="bodyMedium">{count}</Text>
        <IconButton
          onPress={() =>
            dispatch(
              changeItem({
                restaurantId: restaurant.id,
                change: 1,
                itemId: menuItem.id,
              }),
            )
          }
          iconColor={MD3Colors.error50}
          size={20}
          icon="plus"
        />
      </Card.Actions>
    </Card>
  );
};

export default MenuItem;
