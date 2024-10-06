import { forgotPasswordApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const forgotPasswordThunk = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }) => await forgotPasswordApi(data)
);
