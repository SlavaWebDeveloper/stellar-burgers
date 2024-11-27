import {
  getConstructorSelector,
  isAuthorizationSelector,
  setNullOrderModalData,
  setOrderRequest,
  sendOrderThunk
} from '@slices';
import { useDispatch, useSelector } from '@store';
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorState = useSelector(getConstructorSelector);
  const isAuthorization = useSelector(isAuthorizationSelector);

  const constructorItems = constructorState.constructorItems;
  const orderRequest = constructorState.orderRequest;
  const orderModalData = constructorState.orderModalData;

  const onOrderClick = () => {
    if (constructorItems.bun && !isAuthorization) navigate('/login');
    if (constructorItems.bun && isAuthorization) {
      dispatch(setOrderRequest(true));

      const bunId = constructorItems.bun._id;
      const ingredientsIds = constructorItems.ingredients.map(
        (ingredient) => ingredient._id
      );
      const order = [bunId, ...ingredientsIds, bunId];
      dispatch(sendOrderThunk(order));
    }
  };

  const closeOrderModal = () => {
    dispatch(setOrderRequest(false));
    dispatch(setNullOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      constructorItems={constructorItems}
      orderRequest={orderRequest}
      price={price}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
