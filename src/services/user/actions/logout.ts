import { logoutApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const logoutUserThunk = createAsyncThunk('user/logout', logoutApi);
