import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import feedReducer from './feedSlice';
import { getFeedThunk, getOrdersThunk } from './actions';

const setupStore = () =>
  configureStore({
    reducer: {
      feed: feedReducer
    }
  });

describe('feedSlice. Тесты экшенов feedSlice', () => {
  describe('feedSlice. Тесты getFeedThunk', () => {
    test('feedSlice. Тест ожидание ответа после запроса ленты (pending)', () => {
      const store = setupStore();
      store.dispatch({ type: getFeedThunk.pending.type });
      const state = store.getState();
      expect(state.feed.isLoading).toBeTruthy();
      expect(state.feed.error).toBeNull();
      expect(state.feed.orders).toEqual([]);
    });

    test('feedSlice. Тест на ошибки после запроса ленты (rejected)', () => {
      const store = setupStore();
      const error = 'Ошибка запроса ленты';
      store.dispatch({
        type: getFeedThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.feed.isLoading).toBeFalsy();
      expect(state.feed.error).toBe(error);
      expect(state.feed.orders).toEqual([]);
    });

    test('feedSlice. Тест на успешный ответ запроса ленты (fulfilled)', () => {
      const mockedPayload = {
        orders: [
          {
            _id: '6743f723b27b06001c3ea6c4',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0940',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный био-марсианский метеоритный бургер',
            createdAt: '2024-11-25T04:03:47.046Z',
            updatedAt: '2024-11-25T04:03:47.928Z',
            number: 60504
          }
        ],
        total: 60130,
        totalToday: 205
      };

      const store = setupStore();
      store.dispatch({
        type: getFeedThunk.fulfilled.type,
        payload: mockedPayload
      });

      const state = store.getState();
      expect(state.feed.isLoading).toBeFalsy();
      expect(state.feed.error).toBeNull();
      expect(state.feed.orders).toEqual(mockedPayload.orders);
      expect(state.feed.total).toBe(mockedPayload.total);
      expect(state.feed.totalToday).toBe(mockedPayload.totalToday);
    });
  });

  describe('feedSlice. Тесты getOrdersThunk', () => {
    test('feedSlice. Тест на ожидание ответа после запроса заказов (pending)', () => {
      const store = setupStore();
      store.dispatch({ type: getOrdersThunk.pending.type });
      const state = store.getState();
      expect(state.feed.isLoading).toBeTruthy();
      expect(state.feed.error).toBeNull();
    });

    test('feedSlice. Тест на ошибку после запроса заказов (rejected)', () => {
      const store = setupStore();
      const error = 'Ошибка запроса заказов';
      store.dispatch({
        type: getOrdersThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.feed.isLoading).toBeFalsy();
      expect(state.feed.error).toBe(error);
    });

    test('feedSlice. Тест на успешный ответ запроса заказов (fulfilled)', () => {
      const mockedPayload = [
        {
          _id: '6743f723b27b06001c3ea6c4',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный био-марсианский метеоритный бургер',
          createdAt: '2024-11-25T04:03:47.046Z',
          updatedAt: '2024-11-25T04:03:47.928Z',
          number: 60504
        }
      ];

      const store = setupStore();
      store.dispatch({
        type: getOrdersThunk.fulfilled.type,
        payload: mockedPayload
      });

      const state = store.getState();
      expect(state.feed.isLoading).toBeFalsy();
      expect(state.feed.error).toBeNull();
      expect(state.feed.orders).toEqual(mockedPayload);
    });
  });
});
