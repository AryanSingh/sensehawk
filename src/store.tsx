import {configureStore, createStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './components/Cart/cartSlice.tsx';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = createStore(persistedCartReducer);

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
