import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages';
import { MainLayout } from './components/layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Todas as rotas usam o layout principal (Header) */}
        <Route path='/' element={<MainLayout />}>
          <Route path='login' element={<Login />} />
          <Route index element={<Navigate to='/login' replace />} />
        </Route>

        {/* Redirect para login por padrão */}
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    </Router>
  );
}

export default App;
