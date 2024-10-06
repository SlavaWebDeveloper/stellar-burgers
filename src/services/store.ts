import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import userReducer from './user/userSlice';
import orderReducer from './order/orderSlice';
import feedReducer from './feed/feedSlice';
import ingredientsReducer from './ingredients/ingredientsSlice';
import constructorReducer from './constructorBurger/constructorBurgerSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  order: orderReducer,
  ingredients: ingredientsReducer,
  constructorbg: constructorReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
