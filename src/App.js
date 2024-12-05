import './App.css';
import { Outlet } from 'react-router-dom';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginSuccess } from './reducers/authSlice';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user data and jwtToken exist in localStorage
    const savedUser = localStorage.getItem('userData');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      // Restore login state by dispatching loginSuccess
      dispatch(loginSuccess({
        token: savedToken,
        user: JSON.parse(savedUser),
      }));
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className='flex-grow min-h-[calc(100vh-120px)] '>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
