import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, Register } from '../pages';
import { MainLayout } from '../components/layout';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route index element={<Navigate to='/login' replace />} />
      </Route>
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  );
};
