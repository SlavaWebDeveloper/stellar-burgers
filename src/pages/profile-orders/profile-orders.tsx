import { getOrdersSelector, getOrdersThunk } from '@slices';
import { useDispatch, useSelector } from '@store';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrdersSelector);

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
