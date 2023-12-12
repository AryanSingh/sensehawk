import {IFoodItem, IRestaurant} from './data.interface';

export const restaurantList: IRestaurant[] = [
  {
    id: 1,
    name: 'Restaurant 1',
    address: 'Address 1',
    phone: 'Phone 1',
    rating: 4,
    distance: 1.2,
    foodList: [1, 2, 5],
  },
  {
    id: 2,
    name: 'Restaurant 2',
    address: 'Address 2',
    phone: 'Phone 2',
    rating: 3,
    distance: 2.2,
    foodList: [3, 4],
  },
  {
    id: 3,
    name: 'Restaurant 3',
    address: 'Address 3',
    phone: 'Phone 3',
    rating: 5,
    distance: 3.2,
    foodList: [1, 2, 3, 4, 5],
  },
  {
    id: 4,
    name: 'Restaurant 4',
    address: 'Address 4',
    phone: 'Phone 4',
    rating: 2,
    distance: 4.2,
    foodList: [1, 2, 3, 4],
  },
  {
    id: 5,
    name: 'Restaurant 5',
    address: 'Address 5',
    phone: 'Phone 5',
    rating: 1,
    distance: 5.2,
    foodList: [1, 2, 3, 4, 5],
  },
];

export const foodList: IFoodItem[] = [
  {
    id: 1,
    name: 'Food 1',
    price: 10,
    restaurantId: 1,
    cuisine: 'Cuisine 1',
  },
  {
    id: 2,
    name: 'Food 2',
    price: 20,
    restaurantId: 1,
    cuisine: 'Cuisine 2',
  },
  {
    id: 3,
    name: 'Food 3',
    price: 30,
    restaurantId: 2,
    cuisine: 'Cuisine 3',
  },
  {
    id: 4,
    name: 'Food 4',
    price: 40,
    restaurantId: 2,
    cuisine: 'Cuisine 4',
  },
  {
    id: 5,
    name: 'Food 5',
    price: 50,
    restaurantId: 3,
    cuisine: 'Cuisine 5',
  },
];
