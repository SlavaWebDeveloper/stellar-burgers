import { getFeedThunk, getOrdersSelector } from '@slices';
import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrdersSelector);

  const handleGetFeeds = () => {
    dispatch(getFeedThunk());
  };

  useEffect(() => {
    handleGetFeeds();
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
