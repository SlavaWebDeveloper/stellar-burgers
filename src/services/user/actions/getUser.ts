import { getUserApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserThunk = createAsyncThunk('user/get', getUserApi);
