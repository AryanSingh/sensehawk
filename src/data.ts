import {IFoodItem, IRestaurant} from './data.interface';

export const restaurantList: IRestaurant[] = [
  {
    id: 1,
    name: 'Truffles',
    address: 'Koramangala',
    phone: 'Phone 1',
    rating: 4,
    distance: 1.2,
    foodList: [1, 2, 5],
  },
  {
    id: 2,
    name: 'Punjab grill',
    address: 'Indiranagar',
    phone: 'Phone 2',
    rating: 3,
    distance: 2.2,
    foodList: [3, 4],
  },
  {
    id: 3,
    name: 'Boho',
    address: 'Brookefield',
    phone: 'Phone 3',
    rating: 5,
    distance: 3.2,
    foodList: [1, 2, 3, 4, 5],
  },
  {
    id: 4,
    name: 'Rameshwaram Cafe',
    address: 'Whitefield',
    phone: 'Phone 4',
    rating: 2,
    distance: 4.2,
    foodList: [1, 2, 3, 4],
  },
  {
    id: 5,
    name: 'Cafe Siri',
    address: 'Brookefield',
    phone: 'Phone 5',
    rating: 1,
    distance: 5.2,
    foodList: [1, 2, 3, 4, 5],
  },
];

// const foodListMap =

export const foodList: Map<number, IFoodItem> = new Map([
  [
    1,
    {
      id: 1,
      name: 'Food 1',
      price: 10,
      restaurantId: 1,
      cuisine: 'Cuisine 1',
    },
  ],
  [
    2,
    {
      id: 2,
      name: 'Food 2',
      price: 20,
      restaurantId: 1,
      cuisine: 'Cuisine 2',
    },
  ],
  [
    3,
    {
      id: 3,
      name: 'Food 3',
      price: 30,
      restaurantId: 2,
      cuisine: 'Cuisine 3',
    },
  ],
  [
    4,
    {
      id: 4,
      name: 'Food 4',
      price: 40,
      restaurantId: 2,
      cuisine: 'Cuisine 4',
    },
  ],
  [
    5,
    {
      id: 5,
      name: 'Food 5',
      price: 50,
      restaurantId: 3,
      cuisine: 'Cuisine 5',
    },
  ],
]);
