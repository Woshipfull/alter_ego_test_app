import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from './store/appStateSlice';

import Header from './components/Header';
import Homepage from './components/Homepage';
import NewsPage from './components/NewsPage';
import ProfilePage from './components/ProfilePage';
import NotFoundPage from './components/NotFoundPage';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState('');

  useEffect(() => {
    if (localStorage.username) {
      dispatch(logIn());
    }
  }, [dispatch]);

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Header currentLocation={currentLocation} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
