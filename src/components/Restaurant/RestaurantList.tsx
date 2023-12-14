import * as React from 'react';
import {Avatar, Card, Searchbar, Text} from 'react-native-paper';
import {restaurantList} from '../../data.ts';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import {IRestaurant} from '../../data.interface.ts';

// @ts-ignore
const LeftContent = props => <Avatar.Icon {...props} icon="food" />;

const Styles = StyleSheet.create({
  restaurantCard: {
    margin: 10,
  },
  scrollContainer: {
    // paddingBottom: 40,
    marginBottom: 100,
  },
  searchContainer: {
    margin: 10,
  },
});

// @ts-ignore
const RestaurantList = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);
  const [filteredRestaurants, setFilteredRestaurants] = useState<IRestaurant[]>(
    [],
  );

  useEffect(() => {
    setFilteredRestaurants(filterRestaurants(restaurantList, searchQuery));
  }, [searchQuery]);
  const filterRestaurants = (items: IRestaurant[], query: string) => {
    return items.filter(item => {
      if (
        item.name.toLowerCase().includes(query) ||
        item.address.toLowerCase().includes(query) ||
        item.cuisine.find((con: string) =>
          con.toLowerCase().includes(query.toLowerCase()),
        )
      ) {
        return true;
      }
      return false;
    });
  };

  const renderRestaurantList = () => {
    return filteredRestaurants.map(restaurant => {
      return (
        <Card
          style={Styles.restaurantCard}
          onPress={() => {
            navigation.navigate('Menu', {
              restaurantId: restaurant.id,
              restaurant: restaurant,
            });
          }}
          key={restaurant.id}>
          <Card.Title title={restaurant.name} subtitle="" left={LeftContent} />
          <Card.Content>
            {/*<Text variant="titleLarge">{restaurant.name}</Text>*/}
            <Text variant="bodyMedium">Address: {restaurant.address}</Text>
            <Text variant="bodyMedium">Distance: {restaurant.distance}</Text>
            <Text variant="bodyMedium">Rating: {restaurant.rating}</Text>
            <Text variant="bodyMedium">
              Cusine: {restaurant.cuisine.map(item => item).join(', ')}
            </Text>
          </Card.Content>
        </Card>
      );
    });
  };
  return (
    <View>
      <Searchbar
        placeholder="Search by restaurant name, address or cusine"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={Styles.searchContainer}
      />
      <ScrollView style={Styles.scrollContainer}>
        {renderRestaurantList()}
      </ScrollView>
      {/*<BottomNavigationBar />*/}
    </View>
  );
};

export default RestaurantList;
