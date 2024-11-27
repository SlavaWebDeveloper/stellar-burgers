import { isAuthorizationSelector } from '@slices';
import { useSelector } from '@store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  forAuthorization: boolean;
};

export const ProtectedRoute = ({
  forAuthorization = false
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthorization = useSelector(isAuthorizationSelector);
  const from = location.state?.from || '/';

  if (!forAuthorization && isAuthorization) {
    return <Navigate to={from} />;
  }

  if (forAuthorization && !isAuthorization) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return <Outlet />;
};
