import { TRegisterData, updateUserApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const updateUserThunk = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);
