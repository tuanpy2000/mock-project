import React from 'react';
import { useSelector } from 'react-redux';
import { HashLoader } from 'react-spinners';

import './style.scss';

function GlobalLoading() {
  const loading = useSelector((state) => state.GlobalReducer.isLoading);
  if (loading) {
    return (
      <div className="loader">
        <HashLoader color="teal" />
      </div>
    );
  }
  return null;
}
export default GlobalLoading;
