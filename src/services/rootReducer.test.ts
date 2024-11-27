import { rootReducer } from './store'; // путь к файлу, где вы экспортируете rootReducer
import { configureStore } from '@reduxjs/toolkit';

describe('rootReducer and store initialization', () => {
  test('Проверка правильного объединения редьюсеров в rootReducer', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('constructorbg');
  });

  test('store должен быть правильно инициализирован с rootReducer', () => {
    const store = configureStore({
      reducer: rootReducer,
      devTools: process.env.NODE_ENV !== 'production'
    });

    const state = store.getState();
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('constructorbg');
  });

  test('Типы RootState и AppDispatch корректно инференцируются', () => {
    const store = configureStore({
      reducer: rootReducer,
      devTools: process.env.NODE_ENV !== 'production'
    });

    type RootState = ReturnType<typeof rootReducer>;
    type AppDispatch = typeof store.dispatch;

    const dispatch: AppDispatch = store.dispatch;
    const state: RootState = store.getState();

    expect(state.user).toBeDefined();
    expect(state.feed).toBeDefined();
    expect(state.order).toBeDefined();
    expect(state.ingredients).toBeDefined();
    expect(state.constructorbg).toBeDefined();
    expect(dispatch).toBeInstanceOf(Function);
  });

  test('rootReducer с неизвестным экшеном возвращает корректное начальное состояние', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toHaveProperty('user');
    expect(state.user).toEqual({
      error: null,
      isAuthorization: false,
      isLoading: false,
      user: null
    });

    expect(state).toHaveProperty('feed');
    expect(state.feed).toEqual({
      error: null,
      isLoading: false,
      orders: [],
      total: 0,
      totalToday: 0
    });

    expect(state).toHaveProperty('order');
    expect(state.order).toEqual({
      error: null,
      isLoading: false,
      order: null
    });

    expect(state).toHaveProperty('ingredients');
    expect(state.ingredients).toEqual({
      error: null,
      ingredients: [],
      isLoading: false
    });

    expect(state).toHaveProperty('constructorbg');
    expect(state.constructorbg).toEqual({
      constructorItems: { bun: null, ingredients: [] },
      error: null,
      isLoading: false,
      orderModalData: null,
      orderRequest: false
    });
  });
});
