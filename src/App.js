import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
 <BrowserRouter>
 <Routes>
   <Route path="/" element={<SignIn />} />
   <Route path="/dashboard" element={<Dashboard />} />
 </Routes>
</BrowserRouter>
  );
}

export default App;
