import React from 'react';
import { Navigate } from 'react-router-dom';

import { checkToken } from '../../Ultis';

export default function AuthRoute(props) {
  if (checkToken()) {
    return <Navigate to="/home" replace />;
  }
  return props.children;
}
