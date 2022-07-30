import { Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Login from './pages/Login';
import News from './pages/New';
import PrivateRoute from './components/PrivateRoute';
import AuthRoute from './components/AuthRoute';
import Register from './pages/Register';
import Home from './pages/Home';
import DetailCountry from './pages/DetailCountry';
import NotFound from './pages/NotFound';
import GlobalLoading from './components/GlobalLoading';

function App() {
  return (
    <div className="App">
      <GlobalLoading />
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/news" replace />} />
        <Route
          exact
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          exact
          path="/register"
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        />
        <Route exact path="/news" element={<News />} />
        <Route
          exact
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/country/:countrycode"
          element={
            <PrivateRoute>
              <DetailCountry />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
