import React from 'react';
import { Navigate } from 'react-router-dom';

import { checkToken } from '../../Ultis';

export default function PrivateRoute(props) {
  if (!checkToken()) {
    return <Navigate to="/login" replace />;
  }
  return props.children;
}
