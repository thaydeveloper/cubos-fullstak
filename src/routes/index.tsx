import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, Register, Movies, MovieDetails } from '../pages';
import { MainLayout } from '../components/layout';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='movies' element={<Movies />} />
        <Route path='movies/:id' element={<MovieDetails />} />
        <Route index element={<Navigate to='/login' replace />} />
      </Route>
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  );
};
