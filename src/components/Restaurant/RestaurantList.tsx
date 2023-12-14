import * as React from 'react';
import {Avatar, Card, Searchbar, Text, Chip} from 'react-native-paper';
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
  sortContainer: {
    margin: 10,
    // height: 30,
    // flexDirection: 'column',
    // flex: 1,
  },
  sortContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

// @ts-ignore
const RestaurantList = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const [filteredRestaurants, setFilteredRestaurants] = useState<IRestaurant[]>(
    [],
  );
  const [selectedFilter, setSelectedFilter] = useState<
    'rating' | 'distance' | ''
  >('');

  const toggleFilter = (filter: 'rating' | 'distance' | '') => {
    if (selectedFilter === filter) setSelectedFilter('');
    else {
      setSelectedFilter(filter);
    }
  };

  useEffect(() => {
    setFilteredRestaurants(filterRestaurants(restaurantList, searchQuery));
  }, [searchQuery, selectedFilter]);
  const filterRestaurants = (items: IRestaurant[], query: string) => {
    return items
      .filter(item => {
        if (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.address.toLowerCase().includes(query.toLowerCase()) ||
          item.cuisine.find((con: string) =>
            con.toLowerCase().includes(query.toLowerCase()),
          )
        ) {
          return true;
        }
        return false;
      })
      .sort((a, b) => {
        if (selectedFilter && selectedFilter === 'distance')
          return a[selectedFilter] - b[selectedFilter];
        else if (selectedFilter && selectedFilter === 'rating') {
          return b[selectedFilter] - a[selectedFilter];
        }
        return 0;
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
      <Card style={Styles.sortContainer}>
        <Card.Content style={Styles.sortContent}>
          <View>
            <Text>Sort By:</Text>
          </View>
          <Chip
            selected={selectedFilter === 'distance'}
            onPress={() => toggleFilter('distance')}>
            Distance
          </Chip>
          <Chip
            selected={selectedFilter === 'rating'}
            onPress={() => toggleFilter('rating')}>
            Rating
          </Chip>
        </Card.Content>
      </Card>
      <ScrollView style={Styles.scrollContainer}>
        {renderRestaurantList()}
      </ScrollView>
      {/*<BottomNavigationBar />*/}
    </View>
  );
};

export default RestaurantList;
