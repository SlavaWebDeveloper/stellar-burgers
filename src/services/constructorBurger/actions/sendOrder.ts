import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const sendOrderThunk = createAsyncThunk(
  'constructorbg/sendOrder',
  (data: string[]) => orderBurgerApi(data)
);
