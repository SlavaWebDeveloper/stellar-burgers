import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  clearUserError,
  forgotPasswordThunk,
  getUserErrorSelector
} from '@slices';
import { useDispatch, useSelector } from '@store';
import { ForgotPasswordUI } from '@ui-pages';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const error = useSelector(getUserErrorSelector) as string;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearUserError());
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(forgotPasswordThunk({ email: email })).then((data) => {
      if (data.payload) {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      }
    });
  };

  return (
    <ForgotPasswordUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
