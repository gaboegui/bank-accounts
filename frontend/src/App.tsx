import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Clientes } from './pages/Clientes';
import { Cuentas } from './pages/Cuentas';
import { Movimientos } from './pages/Movimientos';
import { Reportes } from './pages/Reportes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/clientes" replace />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="cuentas" element={<Cuentas />} />
          <Route path="movimientos" element={<Movimientos />} />
          <Route path="reportes" element={<Reportes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
