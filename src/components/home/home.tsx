import * as React from 'react';
import {Avatar, Card, Searchbar, Text} from 'react-native-paper';
import {restaurantList} from '../../data.ts';
import {ScrollView, View} from 'react-native';
import {useMemo} from 'react';

// @ts-ignore
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

// @ts-ignore
const Home = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const filterRestaurants = (items, query) => {};

  const filteredRestaurants = useMemo(
    () => filterRestaurants(restaurantList, searchQuery),
    [filterRestaurants, searchQuery],
  );

  const renderRestaurantList = () => {
    return restaurantList.map(restaurant => {
      return (
        <Card
          onPress={() => {
            navigation.navigate('Menu', {
              restaurantId: restaurant.id,
              restaurant: restaurant,
            });
          }}
          key={restaurant.id}>
          <Card.Title title={restaurant.name} subtitle="" left={LeftContent} />
          <Card.Content>
            <Text variant="titleLarge">{restaurant.name}</Text>
            <Text variant="bodyMedium">Address: {restaurant.address}</Text>
            <Text variant="bodyMedium">Distance: {restaurant.distance}</Text>
            <Text variant="bodyMedium">Rating: {restaurant.rating}</Text>
          </Card.Content>
        </Card>
      );
    });
  };
  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <ScrollView>{renderRestaurantList()}</ScrollView>
      {/*<BottomNavigationBar />*/}
    </View>
  );
};

export default Home;
