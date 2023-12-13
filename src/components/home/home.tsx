import * as React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {restaurantList} from '../../data.ts';
import {ScrollView, View} from 'react-native';

// @ts-ignore
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

// @ts-ignore
const Home = ({navigation}) => {
  const renderRestaurantList = () => {
    return restaurantList.map(restaurant => {
      return (
        <Card
          onPress={() => {
            navigation.navigate('Restaurant', {
              restaurantId: restaurant.id,
              restaurant: restaurant,
            });
          }}
          key={restaurant.id}>
          <Card.Title
            title={restaurant.name}
            subtitle="Card Subtitle"
            left={LeftContent}
          />
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
    <ScrollView>
      <View>
        {renderRestaurantList()}
        {/*<BottomNavigationBar />*/}
      </View>
    </ScrollView>
  );
};

export default Home;
