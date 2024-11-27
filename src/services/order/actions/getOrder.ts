import { getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrderThunk = createAsyncThunk('order/get', getOrderByNumberApi);
