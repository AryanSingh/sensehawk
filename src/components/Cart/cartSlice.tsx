import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface CartState {
  restaurantId: number | null;
  cartItems: any;
}

const initialState: CartState = {
  restaurantId: null,
  cartItems: {},
};

interface ItemAction {
  restaurantId: number;
  itemId: number;
  change: number;
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    changeItem: (state, action: PayloadAction<ItemAction>) => {
      if (state.restaurantId !== action.payload.restaurantId) {
        state.cartItems = {};
      }
      state.restaurantId = action.payload.restaurantId;
      if (state.cartItems[action.payload.itemId]) {
        state.cartItems[action.payload.itemId] =
          state.cartItems[action.payload.itemId] + action.payload.change;
      } else {
        state.cartItems[action.payload.itemId] =
          action.payload.change > 0 ? action.payload.change : 0;
      }
      console.log('state', state.cartItems);
    },
    clearCart: state => {
      state.cartItems = {};
      state.restaurantId = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {changeItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;
