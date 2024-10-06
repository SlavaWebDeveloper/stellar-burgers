import { resetPasswordApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const resetPasswordThunk = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) =>
    await resetPasswordApi(data)
);
