import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './orderSlice';
import { getOrderThunk } from './actions';

const setupStore = () =>
  configureStore({
    reducer: {
      order: orderReducer
    }
  });

describe('orderSlice. Тесты orderSlice', () => {
  describe('orderSlice. Тесты getOrderThunk', () => {
    test('orderSlice. Тест на ожидание ответа после запроса заказа (pending)', () => {
      const store = setupStore();
      store.dispatch({ type: getOrderThunk.pending.type });
      const state = store.getState();
      expect(state.order.isLoading).toBeTruthy();
      expect(state.order.error).toBeNull();
    });

    test('orderSlice. Тест на получение ошибки после запроса заказа (rejected)', () => {
      const store = setupStore();
      const error = 'Ошибка запроса заказа';
      store.dispatch({
        type: getOrderThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.order.isLoading).toBeFalsy();
      expect(state.order.error).toBe(error);
    });

    test('orderSlice. Тест на успешный ответ запроса заказа (fulfilled)', () => {
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
        ]
      };

      const store = setupStore();
      store.dispatch({
        type: getOrderThunk.fulfilled.type,
        payload: mockedPayload
      });

      const state = store.getState();
      expect(state.order.isLoading).toBeFalsy();
      expect(state.order.error).toBeNull();
      expect(state.order.order).toEqual(mockedPayload.orders[0]);
    });
  });
});
