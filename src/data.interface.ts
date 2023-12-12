export interface IFoodItem {
  id: number;
  name: string;
  price: number;
  restaurantId: number;
  cuisine: string;
}

export interface IRestaurant {
  id: number;
  name: string;
  address: string;
  phone: string;
  rating: number;
  distance: number;
  foodList: number[];
}

export interface ICartItem {
  foodId: number;
  count: number;
}

export interface ICart {
  restaurantId: number;
  foodList: ICartItem[];
  totalPrice: number;
}
