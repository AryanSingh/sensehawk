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
    cuisine: ['Indian', 'Chinese', 'French'],
  },
  {
    id: 2,
    name: 'Punjab grill',
    address: 'Indiranagar',
    phone: 'Phone 2',
    rating: 3,
    distance: 2.2,
    foodList: [3, 4],
    cuisine: ['Mediterranean', 'Italian'],
  },
  {
    id: 3,
    name: 'Boho',
    address: 'Brookefield',
    phone: 'Phone 3',
    rating: 5,
    distance: 3.2,
    foodList: [1, 2, 3, 4, 5],
    cuisine: ['Indian', 'Chinese', 'Mediterranean', 'Italian', 'French'],
  },
  {
    id: 4,
    name: 'Rameshwaram Cafe',
    address: 'Whitefield',
    phone: 'Phone 4',
    rating: 2,
    distance: 4.2,
    foodList: [1, 2, 3, 4],
    cuisine: ['Indian', 'Chinese', 'Mediterranean', 'Italian'],
  },
  {
    id: 5,
    name: 'Cafe Siri',
    address: 'Brookefield',
    phone: 'Phone 5',
    rating: 1,
    distance: 5.2,
    foodList: [1, 2, 3, 4, 5],
    cuisine: ['Indian', 'Chinese', 'Mediterranean', 'Italian', 'French'],
  },
];

// const foodListMap =

export const foodList: Map<number, IFoodItem> = new Map([
  [
    1,
    {
      id: 1,
      name: 'Chicken tikka',
      price: 10,
      restaurantId: 1,
      cuisine: 'Indian',
    },
  ],
  [
    2,
    {
      id: 2,
      name: 'Noodles',
      price: 20,
      restaurantId: 1,
      cuisine: 'Chinese',
    },
  ],
  [
    3,
    {
      id: 3,
      name: 'Salami',
      price: 30,
      restaurantId: 2,
      cuisine: 'Mediterranean',
    },
  ],
  [
    4,
    {
      id: 4,
      name: 'Pasta',
      price: 40,
      restaurantId: 2,
      cuisine: 'Italian',
    },
  ],
  [
    5,
    {
      id: 5,
      name: 'Quiche',
      price: 50,
      restaurantId: 3,
      cuisine: 'French',
    },
  ],
]);
