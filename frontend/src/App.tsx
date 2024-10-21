import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import CreateAccount from './pages/login/CreateAccount';
import Login from './pages/login/Login';
import './App.css'

function App() {
  return (
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/create-account" element={ <CreateAccount /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
  );
}

export default App;
