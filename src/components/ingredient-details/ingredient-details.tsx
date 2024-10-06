import { getIngredientsSelector } from '@slices';
import { useSelector } from '@store';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';

export const IngredientDetails: FC = () => {
  const ingridientId = useParams().id;

  const ingredients = useSelector(getIngredientsSelector);
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === ingridientId
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
