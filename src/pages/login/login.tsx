import { clearUserError, getUserStateSelector, loginUserThunk } from '@slices';
import { useDispatch, useSelector } from '@store';
import { LoginUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector(getUserStateSelector).isLoading;

  useEffect(() => {
    if (!isLoading) {
      dispatch(clearUserError());
    }
  }, [dispatch, isLoading]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserThunk({ email, password }));
    setPassword('');
  };

  return (
    <LoginUI
      errorText={error?.toString()}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
