import { nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

export const addIngredient = (ingredient: TConstructorIngredient) => ({
  type: 'constructorbg/addIngredient',
  payload: {
    ...ingredient,
    id: nanoid()
  }
});
