import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Button from './components/Button';
import Navbar from './components/Navbar';
import { Home } from './pages/Home';
import Home2 from './pages/Home2';
import Login from './pages/Login';
import AdminPage from './pages/Admin';
import ProtectedRoutes from './utils/protectedRoutes';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home2 />}/>
      <Route path="/home2" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route element={<ProtectedRoutes/>}>
      <Route path='/admin' element={<AdminPage />}/>
				</Route>	
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
