import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { clearUserError } from './userSlice';
import {
  forgotPasswordThunk,
  getUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  resetPasswordThunk,
  updateUserThunk
} from './actions';
import { setCookie, deleteCookie } from '../../utils/cookie';

jest.mock('../../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

const setupStore = () =>
  configureStore({
    reducer: {
      user: userReducer
    }
  });

describe('userSlice. Тесты userSlice', () => {
  describe('userSlice. Тесты для loginUserThunk', () => {
    test('userSlice. Тест на ожидание ответа после запроса юзера (pending)', () => {
      const store = setupStore();
      store.dispatch({ type: loginUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });

    test('userSlice. Тест на получение ошибки после запроса юзера (rejected)', () => {
      const store = setupStore();
      const error = 'Ошибка входа';
      store.dispatch({
        type: loginUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });

    test('userSlice. Тест на успешный ответ запроса юзера (fulfilled)', () => {
      const store = setupStore();
      const mockedPayload = {
        user: { name: 'Test User', email: 'test@user.com' },
        accessToken: 'mockedAccessToken',
        refreshToken: 'mockedRefreshToken'
      };
      store.dispatch({
        type: loginUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.isAuthorization).toBeTruthy();
      expect(state.user.user).toEqual(mockedPayload.user);
      expect(setCookie).toHaveBeenCalledWith(
        'accessToken',
        mockedPayload.accessToken
      );
      expect(localStorage.getItem('refreshToken')).toBe(
        mockedPayload.refreshToken
      );
    });

    test('userSlice. clearUserError очищает поле ошибки', () => {
      const store = setupStore();
      store.dispatch(clearUserError());
      const state = store.getState();
      expect(state.user.error).toBeNull();
    });
  });

  describe('userSlice. Тесты для logoutUserThunk', () => {
    test('userSlice. Тест на ожидание ответа после запроса (pending)', () => {
      const store = setupStore();
      store.dispatch({ type: logoutUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });

    test('userSlice. Тест на получение ошибки после запроса (rejected)', () => {
      const store = setupStore();
      const error = 'Ошибка выхода';
      store.dispatch({
        type: logoutUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });

    test('userSlice. Тест на успешный ответ запроса (fulfilled)', () => {
      const store = setupStore();
      store.dispatch({ type: logoutUserThunk.fulfilled.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.isAuthorization).toBeFalsy();
      expect(state.user.user).toBeNull();
      expect(deleteCookie).toHaveBeenCalledWith('accessToken');
      expect(localStorage.getItem('refreshToken')).toBeNull();
    });
  });

  describe('userSlice. Тесты для forgotPasswordThunk', () => {
    test('userSlice. Тест на ожидание ответа после запроса (pending)', () => {
      const store = setupStore();
      store.dispatch({ type: forgotPasswordThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });

    test('userSlice. Тест на получение ошибки после запроса (rejected)', () => {
      const store = setupStore();
      const error = 'Ошибка при восстановлении пароля';
      store.dispatch({
        type: forgotPasswordThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });

    test('userSlice. Тест на успешный ответ запроса (fulfilled)', () => {
      const store = setupStore();
      store.dispatch({ type: forgotPasswordThunk.fulfilled.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
    });
  });

  describe('userSlice. Тесты для getUserThunk', () => {
    test('userSlice. Тест на ожидание ответа после запроса (pending)', () => {
      const store = setupStore();
      store.dispatch({ type: getUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });

    test('userSlice. Тест на получение ошибки после запроса (rejected)', () => {
      const store = setupStore();
      const error = 'Ошибка при получении данных пользователя';
      store.dispatch({
        type: getUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });

    test('userSlice. Тест на успешный ответ запроса (fulfilled)', () => {
      const store = setupStore();
      const mockedPayload = {
        user: { name: 'Test User', email: 'test@user.com' }
      };
      store.dispatch({
        type: getUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.isAuthorization).toBeTruthy();
      expect(state.user.user).toEqual(mockedPayload.user);
    });
  });

  describe('userSlice. Тесты для registerUserThunk', () => {
    test('userSlice. Тест на ожидание ответа после запроса (pending)', () => {
      const store = setupStore();
      store.dispatch({ type: registerUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });

    test('userSlice. Тест на получение ошибки после запроса (rejected)', () => {
      const store = setupStore();
      const error = 'Ошибка при регистрации';
      store.dispatch({
        type: registerUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });

    test('userSlice. Тест на успешный ответ запроса (fulfilled)', () => {
      const store = setupStore();
      const mockedPayload = {
        user: { name: 'New User', email: 'new@user.com' },
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken'
      };
      store.dispatch({
        type: registerUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.isAuthorization).toBeTruthy();
      expect(state.user.user).toEqual(mockedPayload.user);
      expect(setCookie).toHaveBeenCalledWith(
        'accessToken',
        mockedPayload.accessToken
      );
      expect(localStorage.getItem('refreshToken')).toBe(
        mockedPayload.refreshToken
      );
    });
  });

  describe('userSlice. Тесты для resetPasswordThunk', () => {
    test('userSlice. Тест на ожидание ответа после запроса (pending)', () => {
      const store = setupStore();
      store.dispatch({ type: resetPasswordThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });

    test('userSlice. Тест на получение ошибки после запроса (rejected)', () => {
      const store = setupStore();
      const error = 'Ошибка при сбросе пароля';
      store.dispatch({
        type: resetPasswordThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });

    test('userSlice. Тест на успешный ответ запроса (fulfilled)', () => {
      const store = setupStore();
      store.dispatch({ type: resetPasswordThunk.fulfilled.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
    });
  });

  describe('userSlice. Тесты для updateUserThunk', () => {
    test('userSlice. Тест на ожидание ответа после запроса (pending)', () => {
      const store = setupStore();
      store.dispatch({ type: updateUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });

    test('userSlice. Тест на получение ошибки после запроса (rejected)', () => {
      const store = setupStore();
      const error = 'Ошибка при обновлении данных';
      store.dispatch({
        type: updateUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });

    test('userSlice. Тест на успешный ответ запроса (fulfilled)', () => {
      const store = setupStore();
      const mockedPayload = {
        user: { name: 'Updated User', email: 'updated@user.com' }
      };
      store.dispatch({
        type: updateUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(mockedPayload.user);
    });
  });
});
