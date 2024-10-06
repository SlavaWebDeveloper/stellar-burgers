import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrdersThunk = createAsyncThunk(
  'feed/getProfileFeed',
  getOrdersApi
);
