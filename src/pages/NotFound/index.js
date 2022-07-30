import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'antd';

import './style.scss';
export default function NotFound() {
  const theme = useSelector((state) => state.GlobalReducer.theme);
  return (
    <div className={theme ? 'not-found' : 'dark-not-found'}>
      <img
        src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
        alt="not-found"
      />
      <div className="not-found-button">
        <Link to="/" className="link-home">
          <Button type="primary">Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
