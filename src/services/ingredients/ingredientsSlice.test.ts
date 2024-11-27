import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import { getIngredientsThunk } from './actions';

const setupStore = () =>
  configureStore({
    reducer: {
      ingredients: ingredientsReducer
    }
  });

describe('ingredientsSlice. Тесты ingredientsSlice', () => {
  describe('ingredientsSlice. Тесты getIngredientsThunk', () => {
    test('ingredientsSlice. Тест на ожидание ответа после запроса ингредиентов (pending)', () => {
      const store = setupStore();
      store.dispatch({ type: getIngredientsThunk.pending.type });
      const state = store.getState();
      expect(state.ingredients.isLoading).toBeTruthy();
      expect(state.ingredients.error).toBeNull();
    });

    test('ingredientsSlice. Тест на ошибку после запроса ингредиентов (rejected)', () => {
      const store = setupStore();
      const error = 'Ошибка запроса ингредиентов';
      store.dispatch({
        type: getIngredientsThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.ingredients.isLoading).toBeFalsy();
      expect(state.ingredients.error).toBe(error);
    });

    test('ingredientsSlice. Тест на успешный ответ запроса ингредиентов (fulfilled)', () => {
      const mockedPayload = [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        }
      ];

      const store = setupStore();
      store.dispatch({
        type: getIngredientsThunk.fulfilled.type,
        payload: mockedPayload
      });

      const state = store.getState();
      expect(state.ingredients.isLoading).toBeFalsy();
      expect(state.ingredients.error).toBeNull();
      expect(state.ingredients.ingredients).toEqual(mockedPayload);
    });
  });
});
