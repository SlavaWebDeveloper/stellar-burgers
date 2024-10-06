import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedThunk, getOrdersThunk } from './actions';

export interface FeedState {
  isLoading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
}

const initialState: FeedState = {
  isLoading: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedStateSelector: (state) => state,
    getOrdersSelector: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedThunk.pending, (state) => {
        state.isLoading = true;
        state.orders = [];
        state.error = null;
      })
      .addCase(getFeedThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.orders = [];
        state.error = error.message as string;
      })
      .addCase(getFeedThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
      })
      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrdersThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(getOrdersThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.orders = payload;
      });
  }
});

export { initialState as feedInitialState };
export const { getFeedStateSelector, getOrdersSelector } = feedSlice.selectors;

export default feedSlice.reducer;
