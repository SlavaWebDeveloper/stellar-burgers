import { loginUserApi, TLoginData } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUserThunk = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData) => await loginUserApi(loginData)
);
